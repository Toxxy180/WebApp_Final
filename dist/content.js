/* Course notes: authored summaries; PDF filenames and page ranges are recorded per chapter. */
window.Course = { chapters: [], sources: [
['_Scope.pdf',1],['HTTP for Developer.pdf',36],['HTML Table _ List.pdf',23],['HTML JavaScript.pdf',10],['Methods for Applying Style to Elements.pdf',2],['JavaScript - Variable.pdf',6],['JavaScript - Operator.pdf',3],['JavaScript - String _ Number.pdf',2],['JavaScript - Style Guide.pdf',1],['JavaScript Function - A Cheat Sheet for Developer.pdf',3],['JavaScript - Array.pdf',8],['JavaScript - Object.pdf',8],['JavaScript DOM.pdf',2],['Node.js - Module System.pdf',9],['JavaScript - for React.pdf',2]
] };
// Each item: question, correct choice, three plausible alternatives, reasoning, memory cue.
window.M = (question,correct,wrong,explanation,tip) => ({question,correct,wrong,explanation,tip});
window.normalizeQuestion = function(q,chapterId,i) {
 const multi=!Array.isArray(q);
 const options=multi?[...q.correct.map(text=>({text,correct:true})),...q.wrong.map(text=>({text,correct:false}))]:q.slice(1,5).map((text,j)=>({text,correct:j===0}));
 let seed=(chapterId*997+(i+1)*7919)>>>0;
 for(let j=options.length-1;j>0;j--){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const k=seed%(j+1);[options[j],options[k]]=[options[k],options[j]];}
 const answers=options.flatMap((o,j)=>o.correct?[j]:[]);
 return {id:`${chapterId}-${i+1}`,type:multi?'multiple':'single',question:multi?q.question:q[0],options:options.map(o=>o.text),answers,answer:answers[0],explanation:multi?q.explanation:q[5],tip:multi?q.tip:q[6]};
};
window.addChapter = function(c) {
 c.id = Course.chapters.length+1;
 c.quiz=c.quiz.map((q,i)=>normalizeQuestion(q,c.id,i));
 Course.chapters.push(c);
};
window.S = (title,body) => ({title,body});
