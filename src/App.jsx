import { useState, useCallback,useEffect,useRef} from "react";

function App() {
  const [length, setLength] = useState(8);
  const [num, setNum] = useState(false);
  const [char, setChar] = useState(false);
  const [pass, setPass] = useState("");

  const passRef = useRef("")

  const passGenerator = useCallback(() => {
    let passs = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (num) str = str + "0123456789";
    if (char) str = str + "!@#$&*()_+?><";

    for (let i = 1; i <= length; i++) {
      let chars = Math.floor(Math.random() * str.length + 1);
      passs += str.charAt(chars);
    }
    setPass(passs);
  }, [length, num, char, setPass]);

  const copyPass = useCallback(()=>{
    passRef.current?.select();
    window.navigator.clipboard.writeText(pass)
   },[pass])

  useEffect(()=>{
    passGenerator()
  },[length,num,char,passGenerator])



  return (
    <div className="flex items-center justify-center  mt-64">
      <div className="w-[50vw]  px-4 py-10  bg-gray-700 text-orange-400 rounded-3xl">
        <h1 className="text-4xl text-white text-center mb-8">
          Password Generator
        </h1>
        <div className="flex rounded-lg ml-20 overflow-clip mb-8">
          <input
            type="text"
            value={pass}
            className=" outline-none w-3/4 py-1 px-3 "
            placeholder="password"
            ref={passRef}
            readOnly
          />
          <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          onClick={copyPass}>
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2 ml-20">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={35}
              value={length}
              className=" cursor-pointer flex items-center justify-center"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={num}
              id="numberInput"
              onChange={() => {
                setNum((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput" >Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
              type="checkbox"
              defaultChecked={char}
              id="characterInput"
              onChange={() => {
                setChar((prev) => !prev);
              }}
            />
            <label htmlFor="charcterInput" >Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
