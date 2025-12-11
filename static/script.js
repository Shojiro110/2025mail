// ===== 日付生成関数（一覧表示用） =====
function getRelativeDate(daysAgo = 0) {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${month}月${day}日 ${hours}:${minutes}`;
}

// ===== Nintendoメール用 日付フォーマット関数 =====
// daysAgo: メール受信日が何日前か
// 機能: 受信日時の「2時間半前」の日時を生成して返す
function getNintendoDate(daysAgo = 0) {
    const date = new Date();
    
    // 1. まずメール受信日（一覧と同じ日時）にセット
    date.setDate(date.getDate() - daysAgo);
    
    // 2. そこから「2時間半（150分）」時間を戻す
    date.setMinutes(date.getMinutes() - 150);

    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const h = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    
    // Nintendoのメール形式「YYYY/MM/DD HH:MM (JST)」
    return `「${y}/${m}/${d} ${h}:${min} (JST)」`;
}


// ===== メールメタデータ（本文は外部HTMLをfetch） =====
const mails = [

    { id:"m0", starred:false, read:false, sender:"Amazon.co.jp",
    subject:"　【復旧】Amazonの一部サービスがご利用しづらい状況について",
    snippet:"お客様 各位いつもAmazonご利用いただき、誠にありがとうございます。本日未明より、システム不具合により、一部のお客様においてスマートフォン版およびPC版サイトへのアクセスがしづらい状況が。",
    date:getRelativeDate(1), file:"../static/mails/m0.html" },

    { id:"m8", starred:false, read:false, sender:"Microsoft アカウント チーム",
    subject:"　Microsoft アカウントの不審なサインイン",
    snippet:"Microsoft アカウントの不審なサインイン Microsoft アカウント への最近のサインインにおいて通常とは異なる動作が検出されました。[最近のアクティビティ] ページに移動し、ご自分のアクティビティかどうかをお知らせください。ご自分のものではない場合、ご使用",
    date:getRelativeDate(9), file:"../static/mails/m8.html" },

    { id:"m8-2", starred:false, read:false, sender:"Microsoft アカウント チーム",
    subject:"　Microsoft アカウントの不審なサインイン",
    snippet:"Microsoft アカウントの不審なサインイン Microsoft アカウント への最近のサインインにおいて通常とは異なる動作が検出されました。[最近のアクティビティ] ページに移動し、ご自分のアクティビティかどうかをお知らせください。ご自分のものではない場合、ご使用",
    date:getRelativeDate(9), file:"../static/mails/m8-2.html" },
    
    { id:"m2", starred:false, read:false, sender:"三菱UFJ銀行",
    subject:"　【8月末まで】全員に最大1万円相当プレゼント!",
    snippet:"預金残高と各種条件達成で、今なら最大1万円相当ポイントプレゼント! ポイントアッププログラムリリース記念!キャンペーン実施中!■ エントリー期間2025年6月2日(月)～12月31日(日)■ キャンペーン対象者三菱UFJ銀行の普通預金口座と、対象の三菱UFJカードをお持ちの方",
    date:getRelativeDate(3), file:"../static/mails/m2.html" },

    { id:"m2-2", starred:false, read:false, sender:"三菱UFJ銀行",
    subject:"　【三菱UFJ証券】日頃の感謝を込めて：特別現金プレゼントキャンペーン",
    snippet:"三菱UFJ銀行の普通預金口座と、対象の三菱UFJカードをお持ちの方のお客さまに現金20,000円プレゼントキャンペーン<",
    date:getRelativeDate(3), file:"../static/mails/m2-2.html" },

    { id:"m7", starred:false, read:false, sender:"Nintendo",
    subject:"　【重要】自動継続購入の停止とお手続き方法のご案内",
    snippet:"※本メールは、Nintendo Switch Onlineの自動継続購入が完了できなかった方に送付しております。 下記のいずれかの理由により、",
    date:getRelativeDate(8), file:"../static/mails/m7.html" },

    { id:"m7-2", starred:false, read:false, sender:"Nintendo",
    subject:"　【重要】自動継続購入の停止とお手続き方法のご案内（Nintendo Switch Online）",
    snippet:"※本メールは、Nintendo Switch Onlineの自動継続購入が完了できなかった方に送付をしています。",
    date:getRelativeDate(8), file:"../static/mails/m7-2.html" },

    { id:"m5", starred:false, read:false, sender:"リクルートID",
    subject:"　【重要】2段階認証の設定のお願い",
    snippet:"不正なログイン防止のため2段階認証の設定のお願いリクルートIDをご利用の皆様へ平素はリクルートIDをご利用いただき、誠にありがとうございます。",
    date:getRelativeDate(6), file:"../static/mails/m5.html" },

    { id:"m5-2", starred:false, read:false, sender:"リクルートID",
    subject:"　【重要】2段階認証の設定のお願い",
    snippet:"不正なログイン防止のため2段階認証の設定のお願いリクルートIDをご利用の皆様へ平素はリクルートIDをご利用いただき、誠にありがとうございます。",
    date:getRelativeDate(6), file:"../static/mails/m5-2.html" },

    { id:"m6", starred:false, read:false, sender:"eplus",
    subject:"　【e+より】新しい端末またはブラウザからログインされました",
    snippet:"これまで利用されていたものとは異なる端末またはブラウザでログインされた可能性があります。万が一、このログインにお心当たりがない場合、第三者が[ユーザー名]様の会員登録を使用している可能性がありますので、下記URLよりパスワードを変更してください。",
    date:getRelativeDate(7), file:"../static/mails/m6.html" },

    { id:"m6-2", starred:false, read:false, sender:"eplus",
    subject:"　【e+より】新しい端末またはブラウザからログインされました",
    snippet:"これまで利用されていたものとは異なる端末またはブラウザでログインされた可能性があります。万が一、このログインにお心当たりがない場合、第三者が[ユーザー名]様の会員登録を使用している可能性がありますので、下記URLよりパスワードを変更してください。",
    date:getRelativeDate(7), file:"../static/mails/m6-2.html" },
    
    { id:"m4", starred:false, read:false, sender:"PayPay",
    subject:"　PayPayでお年玉！最大10,000円分のポイントをゲット！",
    snippet:"いつもPayPayをご利用いただきありがとうございます。新しい年を迎えるにあたり、特別キャンペーンを実施中！PayPayを利用するだけで豪華ポイントをゲットするチャンス！キャンペーン概要",
    date:getRelativeDate(5), file:"../static/mails/m4.html" },

    { id:"m4-2", starred:false, read:false, sender:"PayPay",
    subject:"　PayPayでお年玉！最大10,000円分のポイントをゲット！",
    snippet:"いつもPayPayをご利用いただきありがとうございます。新しい年を迎えるにあたり、特別キャンペーンを実施中！PayPayを利用するだけで豪華ポイントをゲットするチャンス！キャンペーン概要",
    date:getRelativeDate(5), file:"../static/mails/m4-2.html" },

    { id:"m1", starred:false, read:false, sender:"LINEヤフー株式会社",
    subject:"　【重要】LINEアカウントの乗っ取りにご注意ください",
    snippet:"セキュリティ上の理由により、お客様のアカウントで再認証が必要です。48時間以内に認証を完了しない場合、アカウントの利用が停止される可能性があります",
    date:getRelativeDate(2), file:"../static/mails/m1.html" },

     { id:"m3", starred:false, read:false, sender:"メルカリ",
    subject:"　【重要】メルカリの事務局からのお知らせ",
    snippet:"いつもメルカリをご利用いただきありがとうございます。現在メルカリでは、皆さまにより安心・安全にアプリをご利用いただけるよう各機能と連携のうえマーケットの健全化に努めており、利用規約「第5条」に基づき",
    date:getRelativeDate(4), file:"../static/mails/m3.html" },
    
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
let filterMode = "inbox"; // 初期値: inbox (受信トレイ)

$q.addEventListener("input", () => {
    query = $q.value;
    renderList();
});

// ===== メール一覧描画 =====
function renderList(){
    const q = query.trim().toLowerCase();
    
    // 1. フィルタリングモードに基づいた絞り込み
    let filteredByMode = mails.filter(m => {
        if (filterMode === "starred") {
            return m.starred; // スター付きのメールのみ
        }
        // filterMode === "inbox" (またはその他のフォルダ) の場合はすべて表示
        return true;
    });

    // ↓↓↓ 【追加】スター付きの場合のみランダムシャッフル ↓↓↓
    if (filterMode === "starred") {
        for (let i = filteredByMode.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [filteredByMode[i], filteredByMode[j]] = [filteredByMode[j], filteredByMode[i]];
        }
    }
    // ↑↑↑
    
    // 2. 検索クエリに基づいた絞り込み
    const filtered = filteredByMode.filter(m =>
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

    // アクティブなフォルダをCSSでハイライト
    document.querySelectorAll(".folders a").forEach(a => {
        a.classList.remove("active");
    });
    const activeLink = document.querySelector(`.folders a[data-filter="${filterMode}"]`);
    if (activeLink) activeLink.classList.add("active");

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
        
        // スター付きリストを表示中にスターを外した場合、即座にリストから消えるようにする
        if (filterMode === "starred" || query.trim() !== "") {
            renderList();
        }
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

        // ↓↓↓ 【修正】Nintendoメールの日付を書き換え ↓↓↓
        const nintendoDateEl = document.getElementById("nintendo-date");
        if (nintendoDateEl) {
            // Nintendoのメール(m7, m7-2)は8日前なので「8」を指定
            // 関数内でさらに「2時間半」時間を戻します
            nintendoDateEl.textContent = getNintendoDate(8);
        }
        // ↑↑↑

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

// ===== サイドバーのフォルダ切替処理 =====
document.querySelectorAll(".folders a").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const mode = link.dataset.filter;
        
        // フィルターモードが存在し、現在のモードと異なる場合のみ更新
        if (mode && mode !== filterMode) {
            filterMode = mode;
            query = ""; // フォルダ切り替え時は検索クエリをリセット
            $q.value = "";
            renderList();
        }
    });
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
        "リクルートID": "member@point.recruit.co.jp",
        "Amazon.co.jp" : "no-reply@amazon.co.jp",
        "Nintendo":"no-reply@accounts.nintendo.com"
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
