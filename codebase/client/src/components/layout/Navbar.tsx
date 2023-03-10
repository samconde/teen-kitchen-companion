import { FC, useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/tkp-pot.svg';
import AuthContext from 'src/context/Auth/AuthContext';
import UserType from '../../model/User/UserType';
import User from 'src/model/User/User';

const NavLinkItem: FC<{
  text: string;
  to: string;
  onClick: { (e?: any): void };
}> = ({ text, to, onClick }) => {
  return (
    <div onClick={onClick}>
      <Link to={to}>
        <div className="py-2 lg:px-2 lg:py-4 lg:hover:border-y-2 lg:border-transparent lg:border-y-2 lg:hover:border-cyan-200">
          <h1 className="text-2xl">{text}</h1>
        </div>
      </Link>
    </div>
  );
};

const Navbar: FC = () => {
  const authContext = useContext(AuthContext);

  const invisible = 'hidden';
  const visible = '';

  const [isVisible, setIsVisible] = useState(false);
  const toggleIsVisible = () => {
    setIsVisible(!isVisible);
  };

  const setInvisible = () => {
    setIsVisible(false);
  };

  return (
    <nav className="flex items-center justify-between py-4 h-20 bg-white">
      <Link
        to="/"
        className="flex items-center ml-3.5 lg:mr-2"
        onClick={setInvisible}
      >
        <img
          src={logo}
          alt="Teen Kitchen Project logo"
          className="h-12 w-12 mr-1 pr-0"
        />
        <h1 className="text-[2.66rem] text- text-gray-700 acumin">TKC</h1>
      </Link>

      {/* Hamburger menu button for small screens */}
      <input
        type="checkbox"
        name=""
        id="toggleMenu"
        className="hidden"
        onChange={toggleIsVisible}
      />
      <label
        className={`h-full w-7 cursor-pointer flex flex-col justify-center items-center mx-1 mr-5 lg:hidden`}
        htmlFor="toggleMenu"
      >
        <div className="bg-gray-500 rounded-sm h-1 w-7"></div>
        <div className="bg-gray-500 rounded-sm h-1 w-7 my-[7px]"></div>
        <div className="bg-gray-500 rounded-sm h-1 w-7"></div>
      </label>

      <div
        className={`absolute py-2 top-20 w-full z-50 shadow-lg text-gray-700 bg-white tk-acumin-pro-condensed  ${
          isVisible ? visible : invisible
        } lg:static lg:flex lg:shadow-none`}
      >
        <div className="pl-5 lg:flex lg:grow">
          <NavLinkItem to="/" text="How it Works" onClick={toggleIsVisible} />
          <NavLinkItem to="/menu" text="Our Menu" onClick={toggleIsVisible} />
          <NavLinkItem
            to="/volunteer"
            text="Volunteer"
            onClick={toggleIsVisible}
          />
          <NavLinkItem
            to="/teen-stories"
            text="Stories"
            onClick={toggleIsVisible}
          />
          <NavLinkItem
            to="/contact-us"
            text="Contact Us"
            onClick={toggleIsVisible}
          />
          <NavLinkItem to="/about" text="About" onClick={toggleIsVisible} />
          {!authContext?.state.isAuthenticated && (
            <NavLinkItem
              to="/journal"
              text="Journal"
              onClick={toggleIsVisible}
            />
          )}
          {!authContext?.state.isAuthenticated && (
            <NavLinkItem to="/survey" text="Survey" onClick={toggleIsVisible} />
          )}
          {!(
            authContext?.state.isAuthenticated &&
            authContext?.state.user?.type === UserType.ADMIN
          ) && (
            <NavLinkItem
              to="/survey/admin"
              text="Admin"
              onClick={toggleIsVisible}
            />
          )}
        </div>

        <div className="pl-3 py-2 pt-3 lg:px-5 text-xl">
          {!authContext?.state.isAuthenticated && (
            <Link to="/login">
              <button className="border-gray-400 hover:bg-slate-200 text-cyan-600 bg-white border rounded-lg px-6 py-1 pb-1.5 shadow-md mx-1 ">
                Log In
              </button>
            </Link>
          )}
          {!authContext?.state.isAuthenticated && (
            <Link to="/sign-up">
              <button className="border-cyan-500 text-white bg-cyan-600 hover:bg-cyan-700 border rounded-lg px-6 py-1 pb-1.5 shadow-md mx-1">
                Sign Up
              </button>
            </Link>
          )}
          {authContext?.state.isAuthenticated && (
            <button
              className="border-gray-400 hover:bg-slate-200 text-cyan-600 bg-white border rounded-lg px-6 py-1 pb-1.5 shadow-md mx-1 "
              onClick={() => authContext?.logout()}
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
