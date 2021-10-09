/* vh2hv (=transpose) */
Array.prototype.forEach.call(
    document.querySelectorAll('.vh2hv'),
    elm => {
        elm.removeChild(elm.children[0]);
        let tbody = elm.children[0];
        let tblHtml = [];
        Array.prototype.forEach.call(
            tbody.querySelectorAll(':scope > tr'),
            (tr, trIndex) => {
                Array.prototype.forEach.call(
                    tr.querySelectorAll(':scope > td, :scope > th'),
                    (td, tdIndex) => {
                        if (!(tdIndex in tblHtml)) {
                            tblHtml[tdIndex] = [];
                        }
                        tblHtml[tdIndex][trIndex] = td;
                    }
                );
            }
        );
        tblHtml = tblHtml.map((r, rIndex) => r.map(s =>{
            return rIndex ? s.outerHTML : s.outerHTML.replace(/<td/g, '<th').replace(/<\/td>/g, '</th>')
        }).join(''));
        tblHtml = tblHtml.map(r => `<tr>${r}</tr>`).join('');
        tblHtml = tblHtml.replace(/<! (row|col)(\d+) >/g, (r, r1, r2) => {
            const st = (r1 === 'row') ? 'col' : 'row';
            return `<! ${st + r2} >`;
        });
        tbody.innerHTML = tblHtml;
    }
);

const TRs = document.querySelectorAll('tr');
for (let i = 0; i < TRs.length; i +=1) {
    const THTDs = TRs[i].childNodes;
    for (let j = 0; j < THTDs.length; j +=1) {
        const target = THTDs[j];
        if (target.textContent.match(/<! (col|row)(\d+) >/)) {
            target[`${RegExp.$1}Span`] = parseInt(RegExp.$2, 10);
            target.textContent= target.textContent.replace(/(?![\\])<!\s*(col|row)(\d+)\s*>/, "");
            target.textContent= target.textContent.replace(/\\(<!\s*(col|row)(\d+)\s*>)/, "$1");
        }
        console.log(target.innerText);
        if (target.textContent.trim() == "..." || target.textContent.trim() == "…" || target.textContent.trim() == "&mldr;") {
            console.log("delete")
            target.parentNode.removeChild(target);
            j -= 1;
        }
    }
}