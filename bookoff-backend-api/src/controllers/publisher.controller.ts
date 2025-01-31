import { Request, Response } from "express";
import publisherService from "../services/publisher.service";

const getAllPublishers = async (req: Request, res: Response) => {
  const publishers = await publisherService.getAllPublishers();
  res.json(publishers);
};

const getPublisherById = async (req: Request, res: Response) => {
  const publisher = await publisherService.getPublisherById(
    Number(req.params.id)
  );
  res.json(publisher);
};

const getPublisherBySlug = async (req: Request, res: Response) => {
  const publisher = await publisherService.getPublisherBySlug(req.params.slug);
  res.json(publisher);
};

const createPublisher = async (req: Request, res: Response) => {
  const newPublisher = await publisherService.createPublisher(req.body);
  res.status(201).json(newPublisher);
};

const updatePublisher = async (req: Request, res: Response) => {
  const updatedPublisher = await publisherService.updatePublisher(
    Number(req.params.id),
    req.body
  );
  res.json(updatedPublisher);
};

const deletePublisher = async (req: Request, res: Response) => {
  const deletedPublisher = await publisherService.deletePublisher(
    Number(req.params.id)
  );
  res.json(deletedPublisher);
};

export default {
  getAllPublishers,
  getPublisherById,
  getPublisherBySlug,
  createPublisher,
  updatePublisher,
  deletePublisher,
};
