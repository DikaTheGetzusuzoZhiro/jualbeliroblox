const toast = document.getElementById("toast");

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.textContent = "", 2200);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("Nomor berhasil disalin.");
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    showToast("Nomor berhasil disalin.");
  }
}

document.querySelectorAll(".method").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".method").forEach(x => x.classList.remove("active"));
    btn.classList.add("active");
    copyText(btn.dataset.copy);
  });
});

const showQris = document.getElementById("showQris");
const qrisBox = document.getElementById("qrisBox");
if (showQris) {
  showQris.addEventListener("click", () => {
    qrisBox.classList.toggle("hidden");
    showQris.textContent = qrisBox.classList.contains("hidden")
      ? "▣ MUNCULKAN QRIS"
      : "✕ SEMBUNYIKAN QRIS";
    if (!qrisBox.classList.contains("hidden")) {
      qrisBox.scrollIntoView({behavior:"smooth", block:"center"});
    }
  });
}

const copyAll = document.getElementById("copyAll");
if (copyAll) {
  copyAll.addEventListener("click", () => {
    const details =
`TAMA STORE
Produk: Akun Polos On Mic
Harga: Rp20.000

Pembayaran:
SeaBank: 901010160791
DANA: 0895328044863
GoPay: 0895328044863`;
    copyText(details);
  });
}
