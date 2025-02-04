import express from 'express';
import type { Request, Response } from 'express';
import { Volunteer } from '../../models/volunteer.js';

const router = express.Router();

// GET /volunteers - Get all volunteers
router.get('/', async (_req: Request, res: Response) => {
  try {
    const volunteers = await Volunteer.findAll();
    res.json(volunteers);
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
});

// GET /volunteers/:id - Get a volunteer by ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const volunteer = await Volunteer.findByPk(id);
    if(volunteer) {
      res.json(volunteer);
    } else {
      res.status(404).json({
        message: 'Volunteer not found'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
});

// POST /volunteers - Create a new volunteer
router.post('/', async (req: Request, res: Response) => {
  const { volunteerName } = req.body;
  try {
    const newVolunteer = await Volunteer.create({
      volunteerName
    });
    res.status(201).json(newVolunteer);
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });
  }
});

// PUT /volunteers/:id - Update a volunteer by ID
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { volunteerName } = req.body;
  try {
    const volunteer = await Volunteer.findByPk(id);
    if(volunteer) {
      volunteer.volunteerName = volunteerName;
      await volunteer.save();
      res.json(volunteer);
    } else {
      res.status(404).json({
        message: 'Volunteer not found'
      });
    }
  } catch (error: any) {
    res.status(400).json({
      message: error.message
    });
  }
});

// DELETE /volunteers/:id - Delete a volunteer by ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const volunteer = await Volunteer.findByPk(id);
    if(volunteer) {
      await volunteer.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({
        message: 'User not found'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
});

export { router as volunteerRouter };
