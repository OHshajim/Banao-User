import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const Home = () => {
    const [error, setError] = useState('')
    const [displayUser, setDisplayUser] = useState(null)
    const { data: users = [], isPending } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            try {
                const result = await axios.get("https://602e7c2c4410730017c50b9d.mockapi.io/users")
                if (result.data.length == 0) {
                    setError("No data to show")
                }
                return result.data;
            }
            catch (error) {
                setError(error.message)
                console.log(error);
            }
        }
    })
    const handleSelect = (user) => {
        console.log(user);
        setDisplayUser(user)
    }
    console.log(users, error);
    return (
        <div className="max-w-screen-2xl mx-auto">
            <div className="bg-white py-20">
                <div className=" mb-7 text-center ">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our Users</h2>
                </div>
                {
                    isPending && error === "" && <div className="w-full flex justify-center mt-20"><div className="loader "/></div>
                }
                {
                    !isPending && error && <p className="text-red-500 font-bold text-xl text-center ">{error} !!!</p>
                }
                {
                    displayUser ? <div className="flex justify-between gap-10">
                        <ul className=" space-y-4 flex-1" >
                            {users.map(user => <li key={user.profile.email} className="border p-3" onClick={() => handleSelect(user)}>
                                <div className="flex items-center gap-x-6">
                                    <img className="h-16 w-16 rounded-full" src={user.avatar} alt="" />
                                    <div>
                                        <h3 className="text-lg font-bold leading-7 tracking-tight text-gray-900">
                                            {user.profile.firstName} {user.profile.lastName}</h3>
                                        <p className="text-sm font-semibold leading-6 text-gray-500">{user.jobTitle}</p>
                                        <p className="text-sm font-semibold leading-6 text-gray-500">Email : {user.profile.email}</p>
                                    </div>
                                </div>
                            </li>)}
                        </ul>
                        <div className="border w-full flex-1 ">
                            <div className="flex flex-col items-center gap-x-6">
                                <img className="rounded-full  p-10 w-1/2" src={displayUser?.avatar} alt="" />
                                <div>
                                    <h3 className="text-lg font-bold leading-7 tracking-tight text-gray-900">
                                        {displayUser?.profile.firstName} {displayUser?.profile.lastName}</h3>
                                    <p className="text-sm font-semibold leading-6 text-gray-500">{displayUser?.jobTitle}</p>
                                    <p className="text-sm font-semibold leading-6 text-gray-500">Email : {displayUser?.profile.email}</p>
                                    <p className="text-sm font-semibold leading-6 text-gray-500">Bio : {displayUser?.Bio}</p>
                                </div>
                            </div>
                        </div>
                    </div> :
                        <ul className=" space-y-4" >
                            {users.map(user => <li key={user.profile.email} className="border p-3" onClick={() => handleSelect(user)}>
                                <div className="flex items-center gap-x-6">
                                    <img className="h-16 w-16 rounded-full" src={user.avatar} alt="" />
                                    <div>
                                        <h3 className="text-lg font-bold leading-7 tracking-tight text-gray-900">
                                            {user.profile.firstName} {user.profile.lastName}</h3>
                                        <p className="text-sm font-semibold leading-6 text-gray-500">{user.jobTitle}</p>
                                        <p className="text-sm font-semibold leading-6 text-gray-500">Email : {user.profile.email}</p>
                                        <p className="text-sm font-semibold leading-6 text-gray-500">Bio : {user.Bio}</p>
                                    </div>
                                </div>
                            </li>)}
                        </ul>
                }
            </div>
        </div>
    );
};

export default Home;