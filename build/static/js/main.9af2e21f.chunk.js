(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{43:function(e,t,n){},44:function(e,t,n){"use strict";n.r(t);var r=n(1),c=n(19),a=n.n(c),i=n(10),u=n(3),o=n(0),l=function(e){var t=e.filterEntry,n=e.handleFilterEntry;return Object(o.jsx)("form",{children:Object(o.jsxs)("fieldset",{children:[Object(o.jsx)("legend",{children:"Filter"}),Object(o.jsxs)("label",{children:["by name: ",Object(o.jsx)("input",{value:t,onChange:n})]})]})})},d=function(e){return Object(o.jsx)("form",{onSubmit:e.handleSubmit,children:Object(o.jsxs)("fieldset",{children:[Object(o.jsx)("legend",{children:"Add a new"}),Object(o.jsxs)("label",{children:["name:"," ",Object(o.jsx)("input",{value:e.name,onChange:e.handleNameEntry,required:!0})]}),Object(o.jsx)("br",{}),Object(o.jsxs)("label",{children:["number:"," ",Object(o.jsx)("input",{value:e.number,onChange:e.handlePhoneEntry,required:!0})]}),Object(o.jsx)("br",{}),Object(o.jsx)("button",{type:"submit",children:"add"})]})})},s=function(e){var t=e.entries,n=e.filterEntry,r=e.handleDelete,c=n?t.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())})):t;return Object(o.jsxs)("div",{children:[Object(o.jsx)("h2",{children:"Numbers"}),Object(o.jsx)("ul",{children:c.length>0?c.map((function(e){return Object(o.jsxs)("li",{children:[e.name," ",e.number," ",Object(o.jsx)("button",{id:e._id,onClick:r,children:"delete"})]},e._id)})):Object(o.jsx)("li",{children:"No entries to display"})})]})},b=function(e){var t=e.feedback;if(t){var n=t.includes("removed from server")||t.includes("failed")?"feedback failure":"feedback success";return Object(o.jsx)("div",{className:n,children:t})}return null},j=n(5),f=n.n(j),h="/api/persons",O={getAll:function(){return f.a.get(h).then((function(e){return e.data}))},createEntry:function(e){return f.a.post(h,e).then((function(e){return e.data}))},deleteEntry:function(e){return f.a.delete("".concat(h,"/").concat(e))},updateEntry:function(e,t){return f.a.put("".concat(h,"/").concat(e),t).then((function(e){return e.data}))}},m=function(){var e=Object(r.useState)([]),t=Object(u.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(""),j=Object(u.a)(a,2),f=j[0],h=j[1],m=Object(r.useState)(""),x=Object(u.a)(m,2),v=x[0],p=x[1],y=Object(r.useState)(""),E=Object(u.a)(y,2),g=E[0],w=E[1],k=Object(r.useState)(),S=Object(u.a)(k,2),C=S[0],D=S[1];Object(r.useEffect)((function(){O.getAll().then((function(e){return c(e)}))}),[]);return Object(o.jsxs)("div",{children:[Object(o.jsx)("h2",{children:"Phonebook"}),Object(o.jsx)(b,{feedback:C}),Object(o.jsx)(l,{filterEntry:g,handleFilterEntry:function(e){return w(e.target.value)}}),Object(o.jsx)(d,{name:f,handleNameEntry:function(e){return h(e.target.value)},number:v,handlePhoneEntry:function(e){return p(e.target.value)},handleSubmit:function(e){if(e.preventDefault(),n.find((function(e){return e.name===f}))){if(window.confirm("".concat(f," is already added to phonebook.\nReplace the old number with a new one?"))){var t=n.find((function(e){return e.name===f}))._id;O.updateEntry(t,{name:f,number:v}).then((function(e){c([].concat(Object(i.a)(n.filter((function(e){return e._id!==t}))),[e])),D("Updated ".concat(f)),h(""),p("")})).catch((function(e){var t=e.response.data.error;D(t||"".concat(f," has already been removed from server. Please refresh the page."))}))}}else O.createEntry({name:f,number:v}).then((function(e){c([].concat(Object(i.a)(n),[e])),D("Added ".concat(f)),h(""),p("")})).catch((function(e){var t=e.response.data.error;t&&D(t)}));setTimeout((function(){return D(null)}),5e3)}}),Object(o.jsx)(s,{entries:n,filterEntry:g,handleDelete:function(e){var t=e.target.id,r=e.target.previousSibling.wholeText;window.confirm("Do you want to remove this entry?\n".concat(r))&&O.deleteEntry(t).then((function(e){204===e.status?(c(n.filter((function(e){return e._id!==t}))),D("Deleted ".concat(r)),setTimeout((function(){return D(null)}),5e3)):alert("Server cannot remove entry with ID ".concat(t))}))}})]})};n(43);a.a.render(Object(o.jsx)(m,{}),document.getElementById("root"))}},[[44,1,2]]]);
//# sourceMappingURL=main.9af2e21f.chunk.js.map