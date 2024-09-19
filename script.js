const Base_URL="https://api.currencyapi.com/v3/latest?apikey=cur_live_bOJxF1C4T0tnra2TEPheMESfPasNwpOQcLuQigod";

const dropdown= document.querySelectorAll(".dropdown select");
const ele=document.querySelectorAll("div");

const btn= document.querySelector("button");

const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".note");

window.addEventListener("load",()=>{
    updateExchangeRate();
})
for(let select of dropdown)
{
    for(let code in countryList)
    {
        let newElement=document.createElement("option");
        newElement.innerText=code;
        newElement.value=code;
        select.append(newElement);
        if(select.name==='from' && code==='INR')
        {
            newElement.selected="selected";
        }
        if(select.name==='to' && code==='USD')
        {
            newElement.selected="selected";
        }
    }

    select.addEventListener("change",(e)=>{
        updateFlag(e.target)});
}

const updateFlag=(element)=>
{
    let currency_code=element.value;
    let country_code=countryList[currency_code];
    let newImage=`https://flagsapi.com/${country_code}/flat/64.png`;
    let image=element.parentElement.querySelector("img");
    image.src=newImage;
}

const updateExchangeRate= async()=>
{
    let amount=document.querySelector(".amount input");
    console.log(amount.value);
    let amtval=amount.value;
    if(amtval< 0)
    {
      amtval=1;
      amount.value="1";
    }
    
  //   const URL=`${Base_URL}/${fromCurr.value}/${toCurr.value}.json`;
     let response = await fetch(Base_URL);
     let rjson= await response.json(); 
     let val=rjson["data"][toCurr.value].value;
      //   console.log(val);
     let exchanged_amt= val * amtval;
     msg.innerText=`${amtval} ${fromCurr.value} = ${exchanged_amt} ${toCurr.value}`
  
  //    console.log(exchanged_amt);
     console.log(rjson["data"][fromCurr.value].code,rjson["data"][fromCurr.value].value);
  //    console.log(amount.value);
  //    console.log(final_conversion);
  //   console.log(fromCurr.value.toLowerCase(),toCurr.value.toLowerCase()) 
}

 btn.addEventListener("click",(e)=>{
  e.preventDefault();
  updateExchangeRate();
})
