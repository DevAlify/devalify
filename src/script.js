console.log(`carregado com sucesso!`)

const btn = document.getElementById("toggleButton");
const icon = document.getElementById("buttonIcon");

let expanded = false;

btn.addEventListener("click", () => {
    expanded = !expanded;

    if (expanded) {
        btn.className =
            "w-full h-full py-3 px-6 border-2 rounded-full text-[#FF0055] hover:bg-[#FF0055] hover:text-white hover:border-[#FF0055] transition-all ease-out duration-500";
        btn.innerHTML = "Ver Mais";
    } else {
        btn.className =
            "flex items-center justify-center w-12 h-12 border-2 border-[#FF0055] rounded-full text-[#FF0055] text-xl hover:bg-[#FF0055] hover:text-white transition-all ease-out duration-500";
        btn.innerHTML = '<i id="buttonIcon" class="fas fa-bars"></i>';
    }
});