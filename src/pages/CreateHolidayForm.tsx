import urlcat from "urlcat";
import axios from "axios";
import { useState, useRef, SyntheticEvent, useEffect } from "react";
import { IHoliday, ICountry, IToken } from "../Interface";
import { useNavigate } from "react-router-dom";

const SERVER = import.meta.env.VITE_SERVER;

// const newHoliday = {
//   title: "Christmas Day",
//   likes: 2033,
//   active: true,
//   celebrated: "631edd08ab37451ee9d74cfe",
// };

const parseJwt = (token: string) => {
  if (token === "") {
    return {};
  }
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

function CreateHolidayForm({ token }: IToken) {
  const [countries, setCountries] = useState([]);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  // console.log(token);

  //   if (token === "") {
  //     navigate("/login");
  //   }

  // if (parseJwt(token).name !== "simon") {
  //   navigate("/login");
  // }

  useEffect(() => {
    const fetchCountries = async () => {
      const url = urlcat(SERVER, "/countries");
      const request = await fetch(url);
      const data = await request.json();
      setCountries(data);
    };
    fetchCountries();
  }, []);

  // useEffect(() => {
  //   const url = urlcat(SERVER, "/verify");
  //   fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }, []);

  const handleCreate = (event: any) => {
    event.preventDefault();
    const elements = event.target.elements;
    console.log(elements);

    const holiday = {
      title: elements.title.value,
      likes: elements.likes.valueAsNumber,
      active: elements.active.checked,
      celebrated: elements.countries.value,
    };
    console.log("holiday %o", holiday);

    const url = urlcat(SERVER, "/holidays");
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(holiday),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("result %o", data);
        if (data.msg === "Too many") {
          setStatus("Too many");
        } else {
          setStatus("OK");
        }
      });
  };

  return (
    <form onSubmit={handleCreate}>
      <fieldset>
        <legend>Holiday</legend>
        <label>
          Title: <input name="title" defaultValue="National Day" />
        </label>
        <br />
        <label>
          Likes: <input name="likes" type="number" defaultValue={10} />
        </label>
        <br />
        <label>
          Active: <input name="active" type="checkbox" />
        </label>
        <br />
        <label>
          Countries:
          <select name="countries">
            {countries.map((country: ICountry) => (
              <option key={country._id} value={country._id}>
                {country.title}
              </option>
            ))}
          </select>
        </label>
      </fieldset>
      <button>Create</button>
      <span>{status} </span>
    </form>
  );
}

export default CreateHolidayForm;
