// DUMMY DATA
import { v4 as uuidV4 } from "uuid";
import { enquiries } from "../dummy-data/enquiries.js";

export const getEnquiries = function (req, res) {
  res.status(200).send(enquiries);
};

export const getEnquiry = function (req, res) {
  const { id } = req.params;
  const foundEnquiry = enquiries.find((enq) => enq.enquiry_id === id);
  if (foundEnquiry) {
    res.status(200).send(foundEnquiry);
  }
};

export const createEnquiry = function (req, res) {
  const { title, topic, user } = req.body;
  if (!title || !topic || !user.from || !user.to) {
    res.status(400).send({ message: "Some fields are missing!." });
    return;
  }
  const newEnquiry = { enquiry_id: uuidV4(), read: false, ...req.body };
  enquiries.push(newEnquiry);
  res.status(201).send(newEnquiry);
};

export const updateEnquiry = function (req, res) {
  const enquiry_id = req.params.id;
  if (!enquiry_id) {
    res.status(404).send({ message: "Error: Can't find property." });
    return;
  }
  const { content, email, title, topic, read, property, user } = req.body;
  const updatedEnquiry = {
    // Fields to update
    ...(content !== undefined && { content }),
    ...(email !== undefined && { email: email.toLowerCase() }),
    ...(title !== undefined && { title }),
    ...(topic !== undefined && { topic }),
    ...(read !== undefined && { read }),
    ...(property !== undefined && { property }),
    ...(user !== undefined && { user }),
  };
  res.status(201).send(updatedEnquiry);
};

export const deleteEnquiry = function (req, res) {
  const { id } = req.params;
  const foundEnquiry = enquiries.find((enq) => enq.enquiry_id === id);
  if (foundEnquiry) {
    res.send({
      message: "Success: Enquiry deleted!",
      enquiry_id: foundEnquiry.enquiry_id,
    });
    return;
  }
  res.status(404).send({ message: "Error: Can't find property." });
};
