import { useEffect, useState } from "react";
import urlcat from "urlcat";
import { IHoliday } from "../Interface";
import { SERVER } from "../utils/constant";

function HolidaysTable() {
  const [holidays, setHolidays] = useState<IHoliday[]>([]);

  useEffect(() => {
    const fetchHolidays = async () => {
      const url = urlcat(SERVER, "/holidays");
      const request = await fetch(url);
      const data = await request.json();
      console.log("data", data);
      setHolidays(data);
    };
    fetchHolidays();
  }, []);

  const handleDelete = (id: string) => async () => {
    const deleteURL = urlcat(SERVER, `/holidays/${id}`);

    // fetch(deleteURL, {
    //   method: "DELETE",
    // })
    //   .then((response) => response.json())
    //   .then((data) => setHolidays(data));

    const res = await fetch(deleteURL, { method: "DELETE" });
    const data = await res.json();
    // log("data %o", data);

    setHolidays(holidays.filter((holiday) => holiday._id !== id));
  };

  return (
    <table>
      <caption>Holidays</caption>
      <thead>
        <tr>
          <th>Title</th>
          <th>Likes</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {holidays.map((holiday: IHoliday) => (
          <tr key={holiday._id}>
            <td>{holiday.title}</td>
            <td>{holiday.likes}</td>
            <td>
              <button>+1</button>
              <button>Edit</button>
              <button onClick={handleDelete(holiday._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default HolidaysTable;
