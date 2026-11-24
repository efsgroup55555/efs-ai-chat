(function () {
  var API = document.currentScript ? new URL(document.currentScript.src).origin : "";
  var hist = [];
  var css = "#efs-ai-b{position:fixed;right:18px;bottom:18px;z-index:99999;background:#B8892B;color:#fff;border:0;border-radius:28px;padding:14px 20px;font:600 15px system-ui;box-shadow:0 4px 14px rgba(0,0,0,.25);cursor:pointer}" +
    "#efs-ai-p{position:fixed;right:18px;bottom:78px;width:min(360px,calc(100vw - 36px));height:min(480px,70vh);z-index:99999;background:#fff;border:1px solid #E4E5E1;border-radius:14px;box-shadow:0 8px 28px rgba(0,0,0,.25);display:none;flex-direction:column;font:15px system-ui}" +
    "#efs-ai-h{padding:12px 14px;background:#111;color:#fff;border-radius:14px 14px 0 0;font-weight:600}" +
    "#efs-ai-m{flex:1;overflow:auto;padding:12px}.efs-u,.efs-a{margin:6px 0;padding:9px 12px;border-radius:12px;max-width:88%;white-space:pre-wrap;line-height:1.4}" +
    ".efs-u{background:#B8892B;color:#fff;margin-left:auto}.efs-a{background:#F2F2EE;color:#111}" +
    "#efs-ai-f{display:flex;border-top:1px solid #E4E5E1}#efs-ai-i{flex:1;border:0;padding:12px;font:15px system-ui;outline:0}" +
    "#efs-ai-s{border:0;background:none;color:#B8892B;font-weight:700;padding:0 14px;cursor:pointer}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  var b = document.createElement("button"); b.id = "efs-ai-b"; b.textContent = "Ask a question"; document.body.appendChild(b);
  var p = document.createElement("div"); p.id = "efs-ai-p";
  p.innerHTML = '<div id="efs-ai-h">Ask us anything about business funding</div><div id="efs-ai-m"></div><div id="efs-ai-f"><input id="efs-ai-i" placeholder="Type your question..." maxlength="500"><button id="efs-ai-s">Send</button></div>';
  document.body.appendChild(p);
  var m = p.querySelector("#efs-ai-m"), i = p.querySelector("#efs-ai-i");
  function add(c, t) { var d = document.createElement("div"); d.className = c; d.textContent = t; m.appendChild(d); m.scrollTop = m.scrollHeight; return d; }
  b.onclick = function () {
    p.style.display = p.style.display === "flex" ? "none" : "flex";
    if (!m.children.length) add("efs-a", "Hi! I can answer questions about business capital, equipment financing, invoice factoring and zero-fee payment processing. What would you like to know?");
  };
  function send() {
    var t = i.value.trim(); if (!t) return; i.value = "";
    add("efs-u", t); hist.push({ role: "user", content: t });
    var w = add("efs-a", "...");
    fetch(API + "/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: hist }) })
      .then(function (r) { return r.json(); })
      .then(function (d) { w.textContent = d.reply; hist.push({ role: "assistant", content: d.reply }); })
      .catch(function () { w.textContent = "Sorry, something went wrong. Please use the Apply Now form."; });
  }
  p.querySelector("#efs-ai-s").onclick = send;
  i.onkeydown = function (e) { if (e.key === "Enter") send(); };
})();
