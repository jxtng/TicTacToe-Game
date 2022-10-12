//////////////////////////////////// Variables
const ul = document.querySelector('.xo')
const li = document.querySelectorAll('.xo li')
const reset_btn = document.querySelector('#reset')
const default_btn = document.querySelector('#default')
const choose = document.querySelector('.choose')
const winner_text = document.querySelector('.winner p')
const mode_class = document.querySelector('#mode')
let counter = 0
let current = 'x'
const algo = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
]
let played = []
let available = []
let pos_plays = [0,1,2,3,4,5,6,7,8]
let winner = ''
let mode = mode_class.value
let click_count = 0
let ai_turn = false

////////////////////////////////////// Codes

// Click and tick
ul.addEventListener('click', (e)=>{
  if(e.target.tagName=='LI'){
    if(e.target.textContent == '' && ai_turn == false){
      if(current == 'x'){
        e.target.textContent = current
        current = 'o'
      }else{
        e.target.textContent = current
        current = 'x'
      }
      played.push(e.target.className)
      click_count++
      available = pos_plays.filter(item=> !played.includes(String(item)))
      if(mode == 'ai'){
        ai_turn = true
        setTimeout(()=>{aiPlay();ai_turn = false;}, 1000)
        
      }
    }
    hideDefault()
    checkWin()
    checkStatus()
  }
})
// Calls
reset_btn.addEventListener('click', reset)
default_btn.addEventListener('click', (e)=>choose.classList.toggle('slide-in'))
choose.addEventListener('click', setDefaultCurrent)
mode_class.addEventListener('click', setMode)

//////////////////////////////////////////// Functions
function checkWin(){
  algo.forEach((item, index)=>{
    const list1 = li[item[0]].textContent
    const list2 = li[item[1]].textContent
    const list3 = li[item[2]].textContent
    if(list1==list2 && list1==list3 && list1 != ''){
      winner_text.textContent = `WINNER: ***${list1.toUpperCase()}***`
      winner_text.classList.add('pad')
      setTimeout(()=>{
        reset()
      }, 2000)
      winner = list1

    }else if(available.length == 0) setTimeout(()=>reset(), 1000)
  })
}
function reset(){
  li.forEach(item=>item.textContent = '')
  default_btn.classList.remove('slide-in')
  current = 'x'
  winner = ''
  click_count = 0
  played = available = []
  winner_text.textContent = ''
  ai_turn = false
  winner_text.classList.remove('pad')
  document.querySelector('.mode-container').classList.remove('slide-in')
  checkStatus()
}
function hideDefault(){
  default_btn.classList.add('slide-in')
  choose.classList.add('slide-in')
  document.querySelector('.mode-container').classList.add('slide-in')
}
function setDefaultCurrent(e){
  if(e.target.tagName == 'SPAN'){
    current = e.target.textContent
    checkStatus()
    choose.classList.add('slide-in')
  }
}
function checkStatus(){
  let text = ''
  if(winner == 'x' || winner == 'o'){
    text = 'Someone has already won'
  }else{
    if(current=='x'){
      text = "X's turn"
    }else{
      text = "O's turn"
    }
  }
  document.querySelector('.status').textContent = text
}
function setMode(){
  mode = mode_class.value
}
function aiPlay(){
  // ai_turn = true
  if(winner == ''){
    const rand = Math.floor(Math.random() * available.length)
    try{
      li[available[rand]].textContent = current
      played.push(li[available[rand]].className)
    }catch(err){
      console.log('Lets Play Again')
    }
    current = current == 'x' ? 'o' : 'x'
  }
  checkStatus()
  checkWin()
}
