// import { Link } from "react-router";
// import { PlusIcon } from "lucide-react";

// const Navbar = () => {
//   return (
//     <header className="bg-base-300 border-b border-base-content/10">
//       <div className="mx-auto max-w-6xl p-4">
//         <div className="flex items-center justify-between">
//           <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">Noter</h1>
//           <div className="flex items-center gap-4">
//             <Link to={"/create"} className="btn btn-primary">
//               <PlusIcon className="size-5" />
//               <span>New Note</span>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };
// export default Navbar;


import { Link, useNavigate } from "react-router-dom";
import { PlusIcon, LogOutIcon } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary font-mono">Noter</h1>
        <div className="flex items-center gap-4">
          {token ? (
            <>
              <Link to="/create" className="btn btn-primary">
                <PlusIcon className="size-5" />
                <span>New Note</span>
              </Link>
              <button className="btn btn-outline" onClick={handleLogout}>
                <LogOutIcon className="size-5" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
