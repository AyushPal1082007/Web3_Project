import { useState, useEffect } from "react";
import "./App.css";
import { getContract } from "./contract";

function App(){

const [text,setText] = useState("");
const [category,setCategory] = useState("");
const [wallet,setWallet] = useState("");

const [study,setStudy] = useState(0);
const [work,setWork] = useState(0);
const [exercise,setExercise] = useState(0);
const [leisure,setLeisure] = useState(0);

async function connectWallet(){

if(!window.ethereum){
alert("Please install MetaMask");
return;
}

try{

const accounts = await window.ethereum.request({
method:"eth_requestAccounts"
});

setWallet(accounts[0]);

}catch(err){
console.log(err);
}

}

useEffect(()=>{

if(wallet){
loadCounters();
}

},[wallet]);

async function loadCounters(){

try{

const contract = await getContract();

const s = await contract.studyCount();
const w = await contract.workCount();
const e = await contract.exerciseCount();
const l = await contract.leisureCount();

setStudy(Number(s));
setWork(Number(w));
setExercise(Number(e));
setLeisure(Number(l));

}catch(err){
console.log(err);
}

}

const classify = async()=>{

if(text===""){
alert("Enter an activity");
return;
}

try{

const res = await fetch("https://ai-backend-gnj7.onrender.com/classify",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({text})
});

const data = await res.json();

setCategory(data.category);

const contract = await getContract();

let tx;

if(data.category==="study"){
tx = await contract.recordStudy();
}
else if(data.category==="work"){
tx = await contract.recordWork();
}
else if(data.category==="exercise"){
tx = await contract.recordExercise();
}
else if(data.category==="leisure"){
tx = await contract.recordLeisure();
}
else{
alert("AI returned unknown category");
return;
}

await tx.wait();

loadCounters();

}catch(err){
console.log(err);
}

};

return(

<div className="app">

<h1>AI Activity Tracker</h1>

<button onClick={connectWallet} className="wallet">
{wallet ? wallet.slice(0,6)+"..."+wallet.slice(-4) : "Connect Wallet"}
</button>

<div className="inputSection">

<input
placeholder="Describe your activity..."
value={text}
onChange={(e)=>setText(e.target.value)}
/>

<button onClick={classify}>
Record Activity
</button>

</div>

<p className="category">
{category && "AI Category: "+category}
</p>

<div className="stats">

<p>📚 Study : {study}</p>

<p>💼 Work : {work}</p>

<p>🏃 Exercise : {exercise}</p>

<p>🎮 Leisure : {leisure}</p>

</div>

</div>

);

}

export default App;