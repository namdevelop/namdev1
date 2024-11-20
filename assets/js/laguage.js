const languages = new Map([
  ["vi", {
    create_field: "Cuộc Trò Chuyện Mới",
    code: "Xóa Các Cuộc Trò Chuyện",
    name: "Cài Đặt",
    type: "Dừng Tạo Ra",
    web_access: "Kết Nối Internet",
    model: "Mô Hình",
    jailbreak: "Jailbreak",
    color: "Màu Nền",
    languages: "Ngôn Ngữ",
    streamed_responses: "Phản hồi trực tuyến đang hoạt động và ổn định,",
     join_discord: "Bạn có thể liên hệ với Facebook của tôi để sửa lỗi và cập nhật:"
  }],
  ["en", {
    create_field: "New Conversation",
    code: "Clear Conversations",
    name: "Settings",
    type: "Stop Generating",
    web_access: "Internet Connection",
    model: "Model",
    jailbreak: "Jailbreak",
    color: "Color",
    languages: "Languages",
    streamed_responses: "Online feedback is currently active and stable,",
    join_discord: "You can contact my Facebook to address any issues and provide updates:"
  }]
]);

// Retrieve the currently selected language from the local storage, or set default to Vietnamese
let currentLanguage = localStorage.getItem("selectedLanguage") || "vi";

function setLanguage(lang, shouldReload = true) {
  currentLanguage = lang;
  localStorage.setItem("selectedLanguage", lang);
  const translation = languages.get(lang);
  translateUI(translation); 
  setRTL();
  if (shouldReload) {
    location.reload();
  }
}

function translateUI(translation) {
  document.getElementById("type").innerHTML = `<span id="type">${translation.type}</span>`,
  document.getElementById("code").innerHTML = `<span id="code">${translation.code}</span>`,
  document.getElementById("name").innerHTML = `<span id="name">${translation.name}</span>`,
  document.getElementById("create-fields").innerHTML = `<span id="create-field">${translation.create_field}</span>`;
  // ... rest of your UI translations ...
}

function setRTL() {
  if (["he", "ar"].includes(currentLanguage)) {
    document.body.setAttribute("dir", "rtl");
  } else {
    document.body.removeAttribute("dir");
  }
}

function load() {
  if (languages.has(currentLanguage)) {
    setLanguage(currentLanguage, false);
    document.getElementById("language").value = currentLanguage;
  } else {
    var browserLanguage = navigator.language.substring(0, 2);
    if (languages.has(browserLanguage)) {
      setLanguage(browserLanguage, false);
      document.getElementById("language").value = browserLanguage;
    }
  }
  
  document.getElementById("language").addEventListener("change", function() {
    setLanguage(this.value);
  });
}

// Call load function when the page finishes loading
window.addEventListener("load", load);