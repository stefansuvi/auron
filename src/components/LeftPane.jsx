import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const menu = [
  { label: "Stocks", path: "/" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Portfolios", path: "/portfolios" },
  { label: "Wallet", path: "/wallet" },
];

const LeftPane = () => {
  const location = useLocation();

  return (
    <div className="w-64 app text-white p-4 flex flex-col gap-10">
      <div>
        <img src='img/auron.png'/>
      </div>
      <nav className="space-y-2">
        {menu.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`block p-[2px] rounded-md hover:bg-accent hover:text-white ${
                isActive ? 'text-white' : 'text-grayText'
              }`}
              style={
                isActive
                  ? {
                      background: 'linear-gradient(90deg, #8c52ff, #5ce1e6)',
                    }
                  : {}
              }
            >
              <div className="bg-sidebar rounded-md px-3">{item.label}</div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default LeftPane;
