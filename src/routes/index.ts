import { Router } from "express";
import { authRouter } from "../modules/auth/auth.routes";
import { dashboardRouter } from "../modules/dashboard/dashboard.routes";
import { devotionalsRouter } from "../modules/devotionals/devotionals.routes";
import { bannersRouter } from "../modules/banners/banners.routes";
import { bulletinsRouter } from "../modules/bulletins/bulletins.routes";
import { birthdaysRouter } from "../modules/birthdays/birthdays.routes";
import { galleryRouter } from "../modules/gallery/gallery.routes";
import { servicesRouter } from "../modules/services/services.routes";
import { membersRouter } from "../modules/members/members.routes";
import { financeRouter } from "../modules/finance/finance.routes";
import { uploadsRouter } from "../modules/uploads/uploads.routes";

export const router = Router();

router.use("/auth", authRouter);
router.use("/dashboard", dashboardRouter);
router.use("/devotionals", devotionalsRouter);
router.use("/banners", bannersRouter);
router.use("/bulletins", bulletinsRouter);
router.use("/birthdays", birthdaysRouter);
router.use("/gallery", galleryRouter);
router.use("/services", servicesRouter);
router.use("/members", membersRouter);
router.use("/finance", financeRouter);
router.use("/uploads", uploadsRouter);
