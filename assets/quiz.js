// Quiz widget. Markup:
// <div class="quiz"> <div class="q"> <p>Question?</p> <div class="opts">
//   <button data-correct>Right answer</button> <button>Wrong</button> ... </div>
//   <p class="why" hidden>Explanation shown after answering.</p> </div> ... <p class="quiz-score"></p> </div>
// Options are shuffled on load, so their order in the source gives nothing away.
document.querySelectorAll(".quiz").forEach((quiz) => {
  const qs = [...quiz.querySelectorAll(".q")];
  const score = quiz.querySelector(".quiz-score");
  let answered = 0, right = 0;
  const show = () => { if (score) score.textContent = `${right} / ${answered} correct · ${qs.length - answered} to go`; };

  qs.forEach((q) => {
    const opts = q.querySelector(".opts");
    const btns = [...opts.querySelectorAll("button")];
    for (let i = btns.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      opts.appendChild(btns.splice(j, 1)[0]); // move a random remaining button to the end
    }
    const why = q.querySelector(".why");
    opts.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => {
      const ok = b.hasAttribute("data-correct");
      opts.querySelectorAll("button").forEach((x) => {
        x.disabled = true;
        if (x.hasAttribute("data-correct")) x.classList.add("is-right");
      });
      if (!ok) b.classList.add("is-wrong");
      answered++; if (ok) right++;
      if (why) {
        why.classList.add(ok ? "ok" : "no");
        why.insertAdjacentHTML("afterbegin", `<strong>${ok ? "Correct." : "Not quite."}</strong> `);
        why.hidden = false;
      }
      show();
    }));
  });
  show();
});
