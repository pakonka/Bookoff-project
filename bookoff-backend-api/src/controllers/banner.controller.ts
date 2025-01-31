import { Request, Response } from "express";
import bannerService from "../services/banner.service";

const getAllBanners = async (req: Request, res: Response) => {
  const banners = await bannerService.getAllBanners();
  res.json(banners);
};

const getBannerById = async (req: Request, res: Response) => {
  const banner = await bannerService.getBannerById(Number(req.params.id));
  res.json(banner);
};

const createBanner = async (req: Request, res: Response) => {
  const newBanner = await bannerService.createBanner(req.body);
  res.status(201).json(newBanner);
};

const updateBanner = async (req: Request, res: Response) => {
  const updatedBanner = await bannerService.updateBanner(
    Number(req.params.id),
    req.body
  );
  res.json(updatedBanner);
};

const deleteBanner = async (req: Request, res: Response) => {
  const deletedBanner = await bannerService.deleteBanner(Number(req.params.id));
  res.json(deletedBanner);
};

export default {
  getAllBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner,
};
