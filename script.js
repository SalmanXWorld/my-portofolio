// script.js

document.addEventListener("DOMContentLoaded", () => {
  // 1. Inisialisasi AOS (Animate On Scroll)
  if (typeof AOS !== "undefined") {
    AOS.init({
      once: true, // Animasi hanya berjalan sekali saat pertama kali di-scroll
      offset: 50, // Jarak trigger animasi dari bawah layar
      duration: 800, // Durasi animasi (ms)
    });
  }

  // 2. Efek Bayangan Navbar saat di-scroll
  const navbar = document.getElementById("navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("shadow-md");
      } else {
        navbar.classList.remove("shadow-md");
      }
    });
  }

  // 3. Logika Toggle Menu Mobile (Hamburger Menu)
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // 4. Logika Dark Mode
  const html = document.documentElement;
  const themeToggles = [
    document.getElementById("theme-toggle"),
    document.getElementById("theme-toggle-mobile"),
  ];
  const themeIcons = [
    document.getElementById("theme-icon"),
    document.getElementById("theme-icon-mobile"),
  ];

  // Cek preferensi tema user sebelumnya
  if (
    localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    html.classList.add("dark");
    updateIcons("dark");
  } else {
    html.classList.remove("dark");
    updateIcons("light");
  }

  // Fungsi klik tombol Dark Mode
  themeToggles.forEach((toggle) => {
    if (toggle) {
      toggle.addEventListener("click", () => {
        html.classList.toggle("dark");
        if (html.classList.contains("dark")) {
          localStorage.setItem("color-theme", "dark");
          updateIcons("dark");
        } else {
          localStorage.setItem("color-theme", "light");
          updateIcons("light");
        }
      });
    }
  });

  // Fungsi untuk mengganti icon bulan/matahari
  function updateIcons(theme) {
    themeIcons.forEach((icon) => {
      if (icon) {
        if (theme === "dark") {
          icon.classList.remove("fa-moon");
          icon.classList.add("fa-sun", "text-yellow-400");
        } else {
          icon.classList.remove("fa-sun", "text-yellow-400");
          icon.classList.add("fa-moon");
        }
      }
    });
  }

  // 5. Logika Tombol "Back to Top"
  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.remove(
          "opacity-0",
          "translate-y-20",
          "pointer-events-none",
        );
        backToTopBtn.classList.add("opacity-100", "translate-y-0");
      } else {
        backToTopBtn.classList.add(
          "opacity-0",
          "translate-y-20",
          "pointer-events-none",
        );
        backToTopBtn.classList.remove("opacity-100", "translate-y-0");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 6. Efek 3D Hover untuk Tombol Sosial Media (Dipindah dari HTML)
  const socialBtns = document.querySelectorAll(".social-btn");
  socialBtns.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      btn.style.transform = `perspective(1000px) scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform =
        "perspective(1000px) scale(1) rotateX(0) rotateY(0)";
    });
  });
});

// 7. Menghilangkan Layar Loading (Loader) saat website selesai dimuat
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.opacity = "0"; // Buat transparan perlahan
    setTimeout(() => {
      loader.style.display = "none"; // Hilangkan dari layout sepenuhnya
    }, 500); // Tunggu 500ms sesuai durasi transisi di HTML
  }
});
function kirimPesan(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const notif = document.getElementById("notif");
  const progress = document.getElementById("progress");

  // ❌ kalau kosong
  if (!name || !email || !message) {
    notif.classList.remove("bg-green-500");
    notif.classList.add("bg-red-500");
    notif.querySelector("span").innerText = "Harap isi semua field!";
  } else {
    notif.classList.remove("bg-red-500");
    notif.classList.add("bg-green-500");
    notif.querySelector("span").innerText = "Pesan Anda berhasil dikirim!";
  }

  // reset progress
  progress.style.transition = "none";
  progress.style.width = "100%";

  // tampilkan notif
  notif.classList.remove("opacity-0", "translate-y-[-20px]");
  notif.classList.add("opacity-100", "translate-y-0");

  // animasi progress
  setTimeout(() => {
    progress.style.transition = "width 3s linear";
    progress.style.width = "0%";
  }, 50);

  // hilang
  setTimeout(() => {
    notif.classList.remove("opacity-100", "translate-y-0");
    notif.classList.add("opacity-0", "translate-y-[-20px]");
  }, 3000);

  // reset form kalau sukses
  if (name && email && message) {
    event.target.reset();
  }
  const btn = document.getElementById("btnKirim");

  btn.innerText = "Mengirim...";
  btn.disabled = true;

  setTimeout(() => {
    btn.innerText = "Kirim Pesan";
    btn.disabled = false;
  }, 3000);
}
// Simpan index foto sekarang
let currentImgIndex = 0;

function openModal(src) {
  const modal = document.getElementById("modalFoto");
  const imgGede = document.getElementById("fotoGede");

  // Ambil daftar gambar TERBARU (Hanya yang ada di tag <img>)
  const allImages = Array.from(document.querySelectorAll("img.foto-project"));
  currentImgIndex = allImages.findIndex((img) => img.src === src);

  imgGede.src = src;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeModal() {
  const modal = document.getElementById("modalFoto");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

function changeImage(direction) {
  const allImages = Array.from(document.querySelectorAll("img.foto-project"));
  if (allImages.length === 0) return;

  currentImgIndex += direction;

  // Looping index
  if (currentImgIndex >= allImages.length) currentImgIndex = 0;
  if (currentImgIndex < 0) currentImgIndex = allImages.length - 1;

  const imgGede = document.getElementById("fotoGede");
  if (imgGede) {
    imgGede.src = allImages[currentImgIndex].src;
  }
}

// FITUR KEYBOARD (ESC & PANAH) - Pastikan ini di luar DOMContentLoaded kalau fungsinya global
document.addEventListener("keydown", (e) => {
  const modal = document.getElementById("modalFoto");
  // Jika modal tidak sembunyi (lagi terbuka)
  if (modal && !modal.classList.contains("hidden")) {
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") changeImage(1);
    if (e.key === "ArrowLeft") changeImage(-1);
  }
});
