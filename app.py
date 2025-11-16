from flask import Flask, render_template, request, send_from_directory
import os

app = Flask(__name__)

@app.route("/")
def home():
    # 例: line-acount-me.webmaillabo.site:443 → line-acount-me.webmaillabo.site
    host = request.host.split(":")[0]

    # ルートドメイン or www や onrender.com のときは普通に index.html
    if (
        host in ("webmaillabo.site", "www.webmaillabo.site")
        or not host.endswith("webmaillabo.site")
    ):
        return render_template("index.html")

    # サブドメイン名だけ取り出す
    # 例: line-acount-me.webmaillabo.site → line-acount-me
    subdomain = host.replace(".webmaillabo.site", "")

    # static/site/＜サブドメイン名＞.html を探す
    filename = f"{subdomain}.html"
    site_dir = os.path.join(app.static_folder, "site")   # static/site
    filepath = os.path.join(site_dir, filename)

    if os.path.exists(filepath):
        # static/site からそのHTMLを返す
        return send_from_directory(site_dir, filename)

    # なかったとき
    return "404 Not Found", 404


if __name__ == "__main__":
    app.run(debug=True)
