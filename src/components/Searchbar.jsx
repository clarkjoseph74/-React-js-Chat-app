import { useContext, useRef } from "react";

import { searchUser, createChat } from "../stores/homeSlice";
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from "../context/authContext";
import ChatBannerSearch from "./chatBannerSearch";

const Searchbar = () => {
  const { currentUser } = useContext(AuthContext);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.home);
  const name = useRef(null);

  const search = (e) => {
    if (e.key === "Enter") {
      dispatch(searchUser(name.current.value));
    }
  };

  const fetchUsers = state.searchedUsers.map((el) => {
    console.log(el);

    return (
      <div
        key={el.uid}
        onClick={(e) => {
          console.log(currentUser);

          dispatch(createChat({ user: el, currentUser: currentUser }));
        }}
      >
        <ChatBannerSearch user={el} />
      </div>
    );
  });

  return (
    <>
      {currentUser && (
        <div className="searchContainer">
          {" "}
          <input
            className="searchField"
            type="text"
            placeholder="Search a User"
            ref={name}
            onKeyDown={search}
          />
          {state.searchLoading ? (
            <span>loading ...</span>
          ) : state.searchedUsers.length === 0 ? (
            <div></div>
          ) : (
            <>
              {fetchUsers}
              <div className="divider"></div>
            </>
          )}
          {state.searchErr && (
            <span className="errorMessage">state.searchErr</span>
          )}
        </div>
      )}
    </>
  );
};

export default Searchbar;
