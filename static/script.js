// ===== 日付生成関数(一覧表示用) =====
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
function getNintendoDate(daysAgo = 0) {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    date.setMinutes(date.getMinutes() - 150);

    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const h = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');

    return `${y}/${m}/${d} ${h}:${min} (JST)`;
}

// ===== メールデータ =====
const mails = [
    { id:"m0", starred:false, read:false, sender:"早稲田大学 system",
      subject:"　【お知らせ】所沢キャンパス101号館にコンビニエンスストアがオープン予定です！",
      snippet:"掲載者：D2:総務課〓＝〓＝〓＝〓＝〓＝〓＝〓＝〓＝〓＝〓＝〓＝〓＝〓＝〓＝〓＝〓＝〓＝〓　所沢キャンパス内にコンビニエンスストアがオープン予定！〓＝〓＝〓＝〓＝〓＝〓＝〓＝〓＝〓＝〓＝〓＝〓＝〓＝〓＝〓＝〓＝〓＝〓",
      date:getRelativeDate(420), file:"../static/mails/m0.html" },

    { id:"m8", starred:false, read:false, sender:"Microsoft アカウント チーム",
    subject:"　Microsoft アカウントの不審なサインイン",
    snippet:"Microsoft アカウントの不審なサインイン Microsoft アカウント への最近のサインインにおいて通常とは異なる動作が検出されました。[最近のアクティビティ] ページに移動し、ご自分のアクティビティかどうかをお知らせください。ご自分のものではない場合、ご使用",
    date:getRelativeDate(9), file:"../static/mails/m8.html" },
    { id:"m8-2", starred:false, read:false, sender:"Microsoft アカウント チーム",
    subject:"　Microsoft アカウントの不審なサインイン",
    snippet:"Microsoft アカウントの不審なサインイン Microsoft アカウント への最近のサインインにおいて通常とは異なる動作が検出されました。[最近のアクティビティ] ページに移動し、ご自分のアクティビティかどうかをお知らせください。ご自分のものではない場合、ご使用",
    date:getRelativeDate(9), file:"../static/mails/m8-2.html" },

        { id:"m2", starred:false, read:false, sender:"三菱UFJ銀行",
    subject:"　【12月末まで】全員に最大1万円相当プレゼント!",
    snippet:"預金残高と各種条件達成で、今なら最大1万円相当ポイントプレゼント! ポイントアッププログラムリリース記念!キャンペーン実施中!■ エントリー期間2025年10月2日(木)～12月31日(日)■ キャンペーン対象者三菱UFJ銀行の普通預金口座と、対象の三菱UFJカードをお持ちの方",
    date:getRelativeDate(3), file:"../static/mails/m2.html" },
    { id:"m2-2", starred:false, read:false, sender:"三菱UFJ銀行",
    subject:"　【三菱UFJ銀行】日頃の感謝を込めて：特別現金プレゼントキャンペーン",
    snippet:"三菱UFJ銀行の普通預金口座と、対象の三菱UFJカードをお持ちの方のお客さまに現金20,000円プレゼントキャンペーン<",
    date:getRelativeDate(3), file:"../static/mails/m2-2.html" },

    { id:"m7", starred:false, read:false, sender:"Nintendo",
    subject:"　【重要】自動継続購入の停止とお手続き方法のご案内",
    snippet:"※本メールは、Nintendo Switch Onlineの自動継続購入が完了できなかった方に送付しております。 下記のいずれかの理由により、",
    date:getRelativeDate(8), file:"../static/mails/m7.html" },
    { id:"m7-2", starred:false, read:false, sender:"Nintendo",
    subject:"　【重要】自動継続購入の停止とお手続き方法のご案内(Nintendo Switch Online)",
    snippet:"※本メールは、Nintendo Switch Onlineの自動継続購入が完了できなかった方に送付をしています。",
    date:getRelativeDate(8), file:"../static/mails/m7-2.html" },

    { id:"m5-2", starred:false, read:false, sender:"リクルートID",
    subject:"　【重要】2段階認証の設定のお願い",
    snippet:"不正なログイン防止のため2段階認証の設定のお願いリクルートIDをご利用の皆様へ平素はリクルートIDをご利用いただき、誠にありがとうございます。",
    date:getRelativeDate(6), file:"../static/mails/m5-2.html" },
    { id:"m5", starred:false, read:false, sender:"リクルートID",
    subject:"　【重要】2段階認証の設定のお願い",
    snippet:"【リクルートID】【重要】リクルートIDへの「なりすましログイン」に関する大切なご連絡　リクルートIDをご利用の皆様へ平素はリクルートIDをご利用いただき、誠にありがとうございます。",
    date:getRelativeDate(6), file:"../static/mails/m5.html" },


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

// ===== DOM取得 =====
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

// ★ サイドバーのフィルタボタン
const $inboxBtn = document.querySelector('[data-filter="inbox"]');
const $starredBtn = document.querySelector('[data-filter="starred"]');

// ===== 状態管理 =====
let query = "";
let filterMode = "inbox";

// ★ スター順キャッシュ: 全体の順序を保持（m0含む）
let starredOrderCache = null;
let starredOrderInitialized = false;

// ===== 検索 =====
$q.addEventListener("input", () => {
    query = $q.value;
    renderList();
});

// ★ フィルタ切り替え
if ($inboxBtn) {
    $inboxBtn.addEventListener("click", () => {
        filterMode = "inbox";
        updateActiveFilter();
        renderList();
    });
}

if ($starredBtn) {
    $starredBtn.addEventListener("click", () => {
        filterMode = "starred";
        updateActiveFilter();
        renderList();
    });
}

// ★ アクティブなフィルタボタンを更新
function updateActiveFilter() {
    document.querySelectorAll('[data-filter]').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`[data-filter="${filterMode}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

// ===== 一覧描画 =====
function renderList() {
    const q = query.trim().toLowerCase();
    let filteredByMode;

    if (filterMode === "starred") {
        const starred = mails.filter(m => m.starred);

        // ★ m0を固定枠にする
        const pinned = starred.filter(m => m.id === "m0");
        const others = starred.filter(m => m.id !== "m0");

        // ★ 初回のみランダムシャッフルして順序を固定
        if (!starredOrderInitialized && others.length > 0) {
            const shuffled = [...others];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            starredOrderCache = shuffled.map(m => m.id);
            starredOrderInitialized = true;
        }

        // キャッシュ順で並べる（starredのみ表示）
        const orderedOthers = starredOrderCache
            ? starredOrderCache
                .map(id => mails.find(m => m.id === id))
                .filter(m => m && m.starred)
            : others;

        filteredByMode = [...pinned, ...orderedOthers];
    } else {
        filteredByMode = mails;
    }

    const filtered = filteredByMode.filter(m =>
        !q ||
        m.subject.toLowerCase().includes(q) ||
        m.sender.toLowerCase().includes(q) ||
        m.snippet.toLowerCase().includes(q)
    );

    $range.textContent = `1–${filtered.length} / ${filtered.length}`;

    $rows.innerHTML = filtered.map(m => `
        <li class="row ${m.read ? 'read' : ''}" data-id="${m.id}">
            <input class="chk" type="checkbox">
            <button class="star ${m.starred ? "on" : ""}">${m.starred ? "★" : "☆"}</button>
            <div class="sender">${m.sender}</div>
            <div class="subj">
                <span>${m.subject}</span>
                <span class="snip"> – ${m.snippet}</span>
            </div>
            <div class="date">${m.date.split(" ")[0]}</div>
        </li>
    `).join("");

    // 行クリック
    document.querySelectorAll(".row").forEach(row => {
        row.addEventListener("click", e => {
            if (e.target.classList.contains("star") || e.target.classList.contains("chk")) return;
            const id = row.dataset.id;
            const m = mails.find(x => x.id === id);
            m.read = true;
            history.pushState({ id }, "", `#${id}`);
            openDetail(id);
        });
    });

    // スター切替
    document.querySelectorAll(".row .star").forEach(btn => {
        btn.addEventListener("click", e => {
            const id = btn.closest(".row").dataset.id;
            const m = mails.find(x => x.id === id);
            const wasStarred = m.starred;
            m.starred = !m.starred;

            // ★ スターの状態が変わったらキャッシュをリセット
            starredOrderCache = null;
            starredOrderInitialized = false;

            e.stopPropagation();
            renderList();
        });
    });
}

// ===== 詳細表示 =====
async function openDetail(id) {
    const m = mails.find(x => x.id === id);
    if (!m) return;

    $subj.textContent = m.subject;
    $dSender.textContent = m.sender;
    $dEmail.textContent = getEmailAddress(m.sender);
    $dDate.textContent = m.date;
    $dAvatar.textContent = m.sender.charAt(0);

    const res = await fetch(m.file, { cache: "no-store" });
    const html = await res.text();
    $body.innerHTML = sanitize(html);

    const nintendoDateEl = document.getElementById("nintendo-date");
    if (nintendoDateEl) {
        nintendoDateEl.textContent = getNintendoDate(8);
    }

    $list.classList.add("hidden");
    $detail.classList.remove("hidden");
}

// ===== 戻る =====
$back.addEventListener("click", () => history.back());
$toolbarBack.addEventListener("click", () => history.back());

window.addEventListener("popstate", ev => {
    if (ev.state?.id) {
        openDetail(ev.state.id);
    } else {
        $detail.classList.add("hidden");
        $list.classList.remove("hidden");
        renderList();
    }
});

// ===== サニタイズ =====
function sanitize(html) {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    tmp.querySelectorAll("script,iframe,style").forEach(el => el.remove());
    return tmp.innerHTML;
}

// ===== メールアドレス =====
function getEmailAddress(sender) {
    const map = {
        "早稲田大学 system": "system@list.waseda.jp",
        "Nintendo": "no-reply@accounts.nintendo.com",
        "Amazon.co.jp": "no-reply@amazon.co.jp",
        "Microsoft アカウント チーム": "account-security-noreply@accountprotection.microsoft.com",
        "LINEヤフー株式会社": "line-account@line.com",
        "三菱UFJ銀行": "email_info02@mufg.jp",
        "メルカリ": "no-reply@mercari.jp",
        "PayPay": "support@paypay.ne.jp",
        "eplus": "info@eplus.co.jp",
        "リクルートID": "member@point.recruit.co.jp"
    };
    return map[sender] || "no-reply@example.com";
}

// ===== 初期表示 =====
updateActiveFilter();
renderList();

// ===== 直リンク対応 =====
if (location.hash) {
    const id = location.hash.slice(1);
    if (mails.some(m => m.id === id)) {
        openDetail(id);
    }
}



