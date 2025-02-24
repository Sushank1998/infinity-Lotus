import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Login({setUserLoggedIn}) {
  const [isloggedIn, setIsloggedIn] = useState("false");
  const [phone, setPhone] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate()

  const isInvalidPhone = phone.length !== 10;
  const hardcodedOtp = "1234";

  const handleContinue= ()=>{
    if (!isInvalidPhone) {
        setShowOtp(true);
      }
  }
  const handleSubmitOtp = () => {
    if (otp === hardcodedOtp) {
      setUserLoggedIn(true); 
      localStorage.setItem("isLoggedIn", "true"); 
      navigate("/");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };
  const handleClickHome = () =>{
    navigate("/");
  }

  return (
    <>
      <button
        onClick={() => {
          setIsloggedIn(!isloggedIn);
        }}
        className="text-xl font-medium cursor-pointer"
      >
        Login
      </button>
      {/* add fun login  */}
      {!isloggedIn && (
        <div className="absolute top-0 right-0 w-screen h-96 bg-white/30 backdrop-blur-sm flex justify-center items-center ">
          <div className="w-[50%] h-auto bg-slate-100 border rounded-sm flex flex-col p-4  m-3">
            <div className="cursor-pointer" onClick={handleClickHome} >

              <FaArrowLeft  />
            </div>
            
            <div>
              <h2 className="text-2xl font-medium text-center">
                India's last minute app
              </h2>
              <h3 className="text-xl font-light text-center">
                {showOtp ? "Enter OTP" : "Log in or Sign up"}
              </h3>

              {!showOtp ? (
                <>
                  <div className="flex flex-col justify-center items-center m-3 ">
                    <div className=" w-1/2  flex justify-start items-center px-4 border rounded-xl bg-white">
                      <p>+91</p>
                      <input
                        type="number"
                        className=" w-full p-4 ps-10 text-sm text-gray-900 focus:outline-hidden"
                        placeholder="Enter your No.."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    {isInvalidPhone && <p className="text-red-500 text-sm mt-1">Enter a valid 10-digit number</p>}
                    <button 
                    onClick={handleContinue}
                    disabled={isInvalidPhone}
                    className="w-1/2 mt-3 flex justify-center items-center px-4 py-2 border rounded-xl bg-gray-200">
                      Continue
                    </button>
                  </div>
                </>
              ) : (
                <>
               <div className="flex flex-col justify-center items-center m-3 ">
               <div className="w-1/2  flex justify-start items-center px-4 border rounded-xl bg-white">
                    <input
                      type="password"
                      placeholder="Enter 4-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full p-4 ps-10 text-sm text-gray-900 focus:outline-hidden"
                      maxLength={4}
                    />
                  </div>
                  <button className="bg-green-700 w-1/2 px-4 py-3 rounded-xl mt-4" onClick={handleSubmitOtp}>
                    Submit OTP
                  </button>
               </div>
                </>
              )}

              <p className="text-gray-900 font-light text-center">
                By continuing, you agree to our Terms of service & Privacy
                policy
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
