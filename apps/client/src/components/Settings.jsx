import NavBar from "./Navbar";
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

const Settings = () => {
    const navigate = useNavigate()

    const [profile, setProfile] = useState({})
    const [shouldFetch, setShouldFetch] = useState(true)

    useEffect(() => {
        if (shouldFetch) {
        const userinfo = JSON.parse(localStorage.getItem("userInfo"))
        const id = userinfo.id
        fetch(`http://localhost:3000/api/user/${id}`)
            .then((response) => response.json())
            .then((data) =>
                setProfile(data));
                setShouldFetch(false)
                
    }}, [shouldFetch]);

    const handleSave = (e) => {
        e.preventDefault();
        const userinfo = JSON.parse(localStorage.getItem("userInfo"))
        const id = userinfo.id
        const {Username, Password, ConfirmPassword, Email} = profile
        fetch(`http://localhost:3000/api/userupdate/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    Username, 
                    Password, 
                    ConfirmPassword, 
                    Email
                }
            )
        })
            .then((response) => {
                console.log(response)
                if (response.ok) {
                    console.log('work')
                    navigate('/Homepage')
                } else {
                    console.log("Invalid, pls try again")
                }
                return response.json()
            })
            .then((data) => {
                setProfile(data)
            });

        }

   
    const setdata = (e) => {
            console.log(e.target)
            const { name, value } = e.target
            setProfile((preval) => {
                return {
                    ...preval,
                    [name]: value
                }
            })
        }


        return (
            <>
                <NavBar />

                <div className="min-h-screen py-10">
                    <div className="container mx-auto">
                        <div className=" lg:flex-row w-full lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
                            <div className="">
                                <h2 className="text-3xl mb-4">Edit User</h2>
                                <form method="post" onSubmit={handleSave} name='google'>

                                    <div className="mt-5">
                                        <label>
                                            Username:
                                        </label>
                                        <input name="Username" placeholder={profile.Username} value={profile.Username} onChange={setdata} className="border border-gray-400 py-1 px-2 w-full"></input>

                                    </div>

                                    <div className="mt-5">
                                        <label>
                                            New Password: </label>
                                        <input name="Password" type="password"  onChange={setdata} className="border border-gray-400 py-1 px-2 w-full"></input>
                                    </div>
                                    <div className="mt-5">
                                        <label>
                                            Confirm New Password: </label>
                                        <input name="ConfirmPassword" type="password"  onChange={setdata} className="border border-gray-400 py-1 px-2 w-full"></input>
                                    </div>

                                    <div className="mt-5">
                                        <label>
                                            Email Address:
                                        </label>
                                        <input name="Email" placeholder={profile.Email} value={profile.Email} onChange={setdata} className="border border-gray-400 py-1 px-2 w-full"></input>
                                    </div>


                                    <div className="mt-5">
                                        <button className="w-full bg-purple-500 py-3 text-center text-white">Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>


            </>
        )
    }

    export default Settings