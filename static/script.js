// ===== 日付生成関数 =====
function getRelativeDate(daysAgo = 0) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${month}月${day}日 ${hours}:${minutes}`;
}

// ===== メールメタデータ（本文は外部HTMLをfetch） =====
const mails = [

    { id:"m4", starred:false, read:false, sender:"PayPay",
    subject:"　PayPayでお年玉！最大10,000円分のポイントをゲット！",
    snippet:"いつもPayPayをご利用いただきありがとうございます。新しい年を迎えるにあたり、特別キャンペーンを実施中！PayPayを利用するだけで豪華ポイントをゲットするチャンス！キャンペーン概要",
    date: getRelativeDate(1), file:"../static/mails/m4.html" },
    
  { id:"m1", starred:false, read:false, sender:"LINEヤフー株式会社",
    subject:"　【重要】LINEアカウントの乗っ取りにご注意ください",
    snippet:"セキュリティ上の理由により、お客様のアカウントで再認証が必要です。48時間以内に認証を完了しない場合、アカウントの利用が停止される可能性があります",
    date: getRelativeDate(2), file:"../static/mails/m1.html" },
  
  { id:"m5", starred:false, read:false, sender:"Microsoft アカウント チーム",
    subject:"　Microsoft アカウントの不審なサインイン",
    snippet:"Microsoft アカウントの不審なサインイン Microsoft アカウント への最近のサインインにおいて通常とは異なる動作が検出されました。[最近のアクティビティ] ページに移動し、ご自分のアクティビティかどうかをお知らせください。ご自分のものではない場合、ご使用",
    date: getRelativeDate(3), file:"../static/mails/m5.html" },

{ id:"m2", starred:false, read:false, sender:"三菱UFJ銀行",
    subject:"　【12月末まで】全員に最大1万円相当プレゼント!",
    snippet:"預金残高と各種条件達成で、今なら最大1万円相当ポイントプレゼント! ポイントアッププログラムリリース記念!キャンペーン実施中!■ エントリー期間2025年12月1日(月)～12月31日(日)■ キャンペーン対象者三菱UFJ銀行の普通預金口座と、対象の三菱UFJカードをお持ちの方",
    date: getRelativeDate(5), file:"../static/mails/m2.html" },
  
  { id:"m6", starred:false, read:false, sender:"eplus",
    subject:"　【e+より】新しい端末またはブラウザからログインされました",
    snippet:"これまで利用されていたものとは異なる端末またはブラウザでログインされた可能性があります。万が一、このログインにお心当たりがない場合、第三者が[ユーザー名]様の会員登録を使用している可能性がありますので、下記URLよりパスワードを変更してください。",
    date: getRelativeDate(7), file:"../static/mails/m6.html" },
    
  // { id:"m7", starred:false, sender:"Amazon.co.jp",
    //subject:"ビジネスの購入なら法人価格で",
    //snippet:"無料の登録でビジネス向けの割引から購買データツールなど得点があります",
    //date:"10月04日 15:30", file:"mails/sub.html" }

    { id:"m3", starred:false, read:false, sender:"メルカリ",
    subject:"　【重要】メルカリの事務局からのお知らせ",
    snippet:"いつもメルカリをご利用いただきありがとうございます。現在メルカリでは、皆さまにより安心・安全にアプリをご利用いただけるよう各機能と連携のうえマーケットの健全化に努めており、利用規約「第5条」に基づき",
    date: getRelativeDate(8), file:"../static/mails/m3.html" },

   { id:"m7", starred:false, read:false, sender:"リクルートID",
    subject:"　【重要】2段階認証の設定のお願い",
    snippet:"不正なログイン防止のため2段階認証の設定のお願いリクルートIDをご利用の皆様へ平素はリクルートIDをご利用いただき、誠にありがとうございます。",
    date: getRelativeDate(10), file:"../static/mails/m7.html" },

];

// ===== 要素取得 =====
const $rows = document.getElementById("rows");
const $list = document.getElementById("mail-list");
const $detail = document.getElementById("mail-detail");
const $subj = document.getElementById("detail-subject");
const $dSender = document.getElementById("detail-sender");
const $dEmail = document.getElementById("detail-email");
const $dDate = document.getElementById("detail-date");
const $dAvatar = document.getElementById("detail-avatar");
const $body = document.getElementById("detail-body");
const $back = document.getElementById("back-btn");
const $toolbarBack = document.getElementById("toolbar-back");
const $range = document.getElementById("range");
const $q = document.getElementById("q");

// ===== 検索処理 =====
let query = "";
$q.addEventListener("input", () => {
  query = $q.value;
  renderList();
});

// ===== メール一覧描画 =====
function renderList(){
  const q = query.trim().toLowerCase();
  const filtered = mails.filter(m =>
    !q ||
    m.subject.toLowerCase().includes(q) ||
    m.sender.toLowerCase().includes(q) ||
    m.snippet.toLowerCase().includes(q)
  );

  const n = filtered.length;
  $range.textContent = `1–${n} / ${n}`;

  $rows.innerHTML = filtered.map(m => `
    <li class="row ${m.read ? 'read' : ''}" data-id="${m.id}">
      <input class="chk" type="checkbox" aria-label="選択">
      <button class="star ${m.starred ? "on": ""}" aria-label="スター">${m.starred ? "★" : "☆"}</button>
      <div class="sender" title="${m.sender}">${m.sender}</div>
      <div class="subj">
        <span class="subject-text">${m.subject}</span>
        <span class="snip"> – ${m.snippet}</span>
      </div>
      <div class="date">${m.date.split(" ")[0]}</div>
    </li>
  `).join("");

  // 行クリックで本文表示
  document.querySelectorAll(".row").forEach(row => {
    row.addEventListener("click", e => {
      if (e.target.classList.contains("star") || e.target.classList.contains("chk")) return;
      const id = row.dataset.id;
      const m = mails.find(x => x.id === id);
      m.read = true; // 開封済みにマーク
      history.pushState({ id }, "", `#${id}`);
      openDetail(id);
    });
  });

  // スター切替
  document.querySelectorAll(".row .star").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = btn.closest(".row").dataset.id;
      const m = mails.find(x => x.id === id);
      m.starred = !m.starred;
      btn.textContent = m.starred ? "★" : "☆";
      btn.classList.toggle("on", m.starred);
      e.stopPropagation();
    });
  });
}

// ===== 本文を外部HTMLから読み込む =====
async function openDetail(id){
  const m = mails.find(x => x.id === id);
  if(!m) {
    console.error("Mail not found:", id);
    return;
  }

  console.log("Opening mail:", m.id, m.subject);

  // メタ情報表示
  $subj.textContent = m.subject;
  $dSender.textContent = m.sender;
  $dEmail.textContent = getEmailAddress(m.sender);
  $dDate.textContent = m.date;
  $dAvatar.textContent = (m.sender || "?").trim().charAt(0).toUpperCase();

  // 本文fetch
  try {
    console.log("Fetching:", m.file);
    const res = await fetch(m.file, { cache: "no-store" });
    if (!res.ok) throw new Error(res.status);
    const html = await res.text();
    console.log("HTML loaded, length:", html.length);
    $body.innerHTML = sanitize(html);
  } catch (e) {
    console.error("Error loading mail:", e);
    $body.innerHTML = `<p style="color:#c00">本文を読み込めませんでした（${m.file}）。</p>`;
  }

  $list.classList.add("hidden");
  $detail.classList.remove("hidden");
}

// ===== 戻る処理 =====
$back.addEventListener("click", () => {
  history.back();
  renderList(); // 一覧を再描画して開封済み状態を反映
});
$toolbarBack.addEventListener("click", () => {
  history.back();
  renderList(); // 一覧を再描画して開封済み状態を反映
});
window.addEventListener("popstate", ev => {
  if (ev.state && ev.state.id) {
    openDetail(ev.state.id);
  } else {
    $detail.classList.add("hidden");
    $list.classList.remove("hidden");
    renderList(); // 一覧を再描画
  }
});

// ===== HTMLサニタイズ =====
function sanitize(html){
  const tmp = document.createElement("div");
  tmp.innerHTML = html || "";
  tmp.querySelectorAll("script,iframe,object,embed,style").forEach(el => el.remove());
  
  // ローカルリンク（../ で始まる）は現在のウィンドウで開く
  // 外部リンク（http で始まる）のみ新規ウィンドウで開く
  tmp.querySelectorAll("a").forEach(a => {
    const href = a.getAttribute("href") || "";
    if (href.startsWith("http")) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    // ローカルリンクは target="_blank" を設定しない
  });
  
  return tmp.innerHTML;
}

// ===== メールアドレス生成 =====
function getEmailAddress(sender) {
  const emailMap = {
    "三菱UFJ銀行": "campaign@bk.mufg.jp",
    "メルカリ": "no-reply@mercari.jp",
    "PayPay": "support@paypay.ne.jp",
    "LINEヤフー株式会社": "line-account@line.com",
    "Microsoft アカウント チーム": "account-security-noreply@accountprotection.microsoft.com",
    "eplus": "info@eplus.co.jp",
    "リクルート": "member@point.recruit.co.jp"
  };
  return emailMap[sender] || "member@point.recruit.co.jp";
}

// ===== 初期表示 =====
renderList();

// ===== ハッシュ直リンク対応（#m1など） =====
if (location.hash) {
  const id = location.hash.slice(1);
  if (mails.some(m => m.id === id)) {
    const m = mails.find(x => x.id === id);
    m.read = true; // 開封済みにマーク
    history.replaceState({ id }, "", `#${id}`);
    openDetail(id);
  }
}


