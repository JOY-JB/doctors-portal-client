import { Button, Input, TextField } from "@mui/material";
import React, { useState } from "react";

const AddDoctor = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("image", image);

    fetch("https://salty-island-18444.herokuapp.com/doctors", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("doctor added Successfully!!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h2> Add a Doctor </h2>

      <form onSubmit={handleSubmit}>
        <TextField
          sx={{ width: "40%" }}
          onChange={(e) => setName(e.target.value)}
          label="Name"
          variant="standard"
          required
        />
        <br />
        <TextField
          sx={{ width: "40%" }}
          label="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          variant="standard"
          required
        />
        <br />
        <Input
          sx={{ width: "40%" }}
          accept="image/*"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <br />
        <Button variant="contained" type="submit">
          Add Doctor
        </Button>
      </form>
    </div>
  );
};

export default AddDoctor;
