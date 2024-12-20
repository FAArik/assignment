import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  //Company Name - Company Legal Number - Incorporation Country - Website
  {
    companyName: { type: String, required: true },
    companyLegalNumber: { type: String, required: true },
    incorporationCountry: { type: String, required: true },
    website: { type: String, required: true },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);

export default Company;