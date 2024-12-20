import express from "express";
import Company from "../models/company.model.js";

var router = express.Router();

/* GetAll companys */
router.get("/getAll", async function (req, res) {
  var allCompanys = await Company.find({});
  res.json(allCompanys);
});

router.get("/count", async function (req, res) {
  try {
    const count = await Company.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch company count' });
  }
});

router.get("/latest", async function (req, res) {
  try {
    const latestCompanies = await Company.find()
        .sort({ createdAt: -1 })
        .limit(3);

    res.json({ companies: latestCompanies });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch latest companies' });
  }
});

/* Get company by id */
router.get("/:id", async function (req, res) {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "No id specified" });
  }

  try {
    const companyById = await Company.findById(id);
    if (!companyById) {
      return res.status(404).json({ error: `Company with ID ${id} not found` });
    }
    res.json(companyById);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while fetching company" });
  }
});

router.post("/addCompany", async function (req, res) {
  const { 
    companyName, 
    companyLegalNumber, 
    incorporationCountry, 
    website 
  } = req.body;

  try {
    const newCompany = new Company({
      companyName,
      companyLegalNumber,
      incorporationCountry,
      website,
    });

    const company = await newCompany.save();
    res.json(company._id);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put("/updateCompany", async function (req, res) {
  const {
    id,
    companyName, 
    companyLegalNumber, 
    incorporationCountry, 
    website,
  } = req.body;

  try {
    await Company.findByIdAndUpdate(id, {
      companyName,
      companyLegalNumber,
      incorporationCountry,
      website,
    });

    res.json("Company updated successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/deleteCompany/:companyId", async function (req, res) {
  const id = req.params.companyId;

  if (!id) {
    return res.status(400).json({ error: "No id specified" });
  }

  try {
    const deletedCompany = await Company.findByIdAndDelete(id);

    if (!deletedCompany) {
      return res.status(404).json({ error: `Company with ID ${id} not found` });
    }

    res.json({ message: "Company deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error while deleting company" });
  }
});

export default router;
