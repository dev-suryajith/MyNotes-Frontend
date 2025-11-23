import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { loginUserApi, registerUserApi } from "../services/allAPI";

function LoginRegister({ login }) {
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Auto-login if user already stored
    useEffect(() => {
        const storedUser = localStorage.getItem("NoteUser");
        if (storedUser) {
            navigate("/notes");
        }
    }, []);

    // ---------- LOGIN ----------
    const handleLogin = async () => {
        const { email, password } = userDetails;

        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }

        try {
            const response = await loginUserApi({ email, password });

            if (response.status === 200) {

                // response.data is an array of users
                const storeData = response.data.find(
                    user => user.email === email && user.password === password
                );

                if (!storeData) {
                    alert("Invalid email or password!");
                    return;
                }

                alert("Login Successful 🎉");
                localStorage.setItem("NoteUser", JSON.stringify(storeData));
                navigate("/notes");
            }

        } catch (error) {
            alert("Invalid email or wrong password!");
            console.error("Login Error →", error);
        }
    };


    // ---------- REGISTER ----------
    const handleRegister = async () => {
        const { name, email, password } = userDetails;

        if (!name || !email || !password || !confirmPassword) {
            alert("Please fill all fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        try {
            const response = await registerUserApi(userDetails);

            if (response.status === 200 || response.status === 201) {
                alert("Registration Successful 🎉");
                localStorage.setItem("NoteUser", JSON.stringify(response.data));
                navigate("/notes");
            }
        } catch (error) {
            if (error?.response?.status === 409) {
                alert("User already exists. Please Login.");
            } else {
                alert("Something went wrong while registering.");
                console.error("Registration Error →", error);
            }
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                width: "100%",
                height: "100vh",
                background: "linear-gradient(135deg,#1d384a 0%,#092d55 50%, #2c3e50 100%)",
            }}
        >
            <div
                className="card p-4 shadow-lg"
                style={{ width: "350px", borderRadius: "14px" }}
            >
                <h3 className="text-center mb-4 fw-bold">
                    {login ? "Login" : "Create Account"}
                </h3>

                {/* Name (Only Register) */}
                {!login && (
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Your Name"
                        onChange={(e) =>
                            setUserDetails({ ...userDetails, name: e.target.value })
                        }
                    />
                )}

                {/* Email */}
                <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Your Email"
                    onChange={(e) =>
                        setUserDetails({ ...userDetails, email: e.target.value })
                    }
                />

                {/* Password */}
                <div className="input-group mb-3">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Your Password"
                        onChange={(e) =>
                            setUserDetails({ ...userDetails, password: e.target.value })
                        }
                    />
                    <span
                        className="input-group-text"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                {/* Confirm Password (Only Register) */}
                {!login && (
                    <div className="input-group mb-3">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="form-control"
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <span
                            className="input-group-text"
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                )}

                {/* Button */}
                <button
                    className="btn btn-primary w-100"
                    onClick={login ? handleLogin : handleRegister}
                >
                    {login ? "Login" : "Register"}
                </button>

                <p className="text-center mt-3" style={{ fontSize: "14px" }}>
                    {login ? "Don't have an account?" : "Already have an account?"}
                    <a href={login ? "/register" : "/login"} className="ms-1 text-decoration-none" >
                        {login ? "Register" : "Login"}
                    </a>
                </p>
            </div>
        </div>
    );
}

export default LoginRegister;
