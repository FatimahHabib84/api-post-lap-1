import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "../component/Nav";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios
      .get("https://665736bb9f970b3b36c86669.mockapi.io/charcter")
      .then(function (response) {
        console.log(response.data);
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="bg-zinc-50 grid grid-cols-3 max-sm:grid-cols-1">
      <Nav />
      <div className="flex flex-col col-span-3 text-center rounded-md bg-zinc-100 font-bold p-6 items-center gap-4">
        <div className="flex flex-row">
          <input
            className="bg-zinc-200 focus:bg-zinc-300 rounded-md px-2 py-1 w-fit mx-2"
            placeholder="seach for character"
            type="text"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button
            className="bg-zinc-700 hover:bg-zinc-800 text-white rounded-md px-2 py-1 w-fit mx-2"
            onClick={() => {
              return setData(
                data.filter((item) => {
                  return item.name
                    .toLowerCase()
                    .includes(search.toLocaleLowerCase());
                })
              );
            }}
          >
            search
          </button>
        </div>
      </div>
      {data.length == 0 ? (
        <p>oppps</p>
      ) : (
        data.map((item) => {
          return (
            <div
              key={item.id}
              className="flex flex-col gap-2 rounded-md m-4 p-4 items-center max-sm:col-span-3 bg-white"
            >
              <img
                className="rounded-md shadow-md shadow-black"
                src={item.image}
              />
              <p className="font-bold text-center">Name: {item.name}</p>
              <p className="font-bold text-center">Gender: {item.gender}</p>
              <div className="flex flex-row gap-2">
                <button
                  onClick={() => {
                    setId(item.id);
                    document.getElementById("my_modal_1").showModal();
                  }}
                  className="bg-rose-700 hover:bg-rose-800 text-white rounded-md px-4 py-1 w-fit"
                >
                  Delete
                </button>

                <Link to={`/Edit/${item.id}`}>
                  <button className="bg-zinc-700 hover:bg-zinc-800 text-white rounded-md px-4 py-1 w-fit">
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          );
        })
      )}
      <dialog id="my_modal_1" className="px-12 py-4 rounded-md">
        <div className="flex flex-col items-center">
          <p className="py-4 font-bold text-red-800">
            Are you sure you want to dalete this charcter!!
          </p>
          <div className="modal-action ">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={() => {
                  axios
                    .delete(
                      `https://665736bb9f970b3b36c86669.mockapi.io/charcter/${id}`
                    )
                    .then(function (res) {
                      console.log(res.data);
                      setData(data.filter((item) => item.id !== id));
                    });
                }}
                className="bg-red-700 hover:bg-red-800 text-white rounded-md px-4 py-1 w-fit mx-2"
              >
                Delete
              </button>
              <button className="bg-zinc-700 hover:bg-zinc-800 text-white rounded-md px-4 py-1 w-fit mx-2">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Home;
