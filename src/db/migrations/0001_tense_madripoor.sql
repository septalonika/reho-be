CREATE INDEX "bulletins_status_idx" ON "bulletins" USING btree ("status");--> statement-breakpoint
CREATE INDEX "bulletins_period_date_idx" ON "bulletins" USING btree ("period_date");--> statement-breakpoint
CREATE INDEX "devotionals_author_id_idx" ON "devotionals" USING btree ("author_id");--> statement-breakpoint
CREATE INDEX "devotionals_status_idx" ON "devotionals" USING btree ("status");--> statement-breakpoint
CREATE INDEX "devotionals_devotional_date_idx" ON "devotionals" USING btree ("devotional_date");--> statement-breakpoint
CREATE INDEX "gallery_items_album_id_idx" ON "gallery_items" USING btree ("album_id");--> statement-breakpoint
CREATE INDEX "members_active_idx" ON "members" USING btree ("active");--> statement-breakpoint
CREATE INDEX "roster_assignments_member_id_idx" ON "roster_assignments" USING btree ("member_id");--> statement-breakpoint
CREATE INDEX "services_service_date_idx" ON "services" USING btree ("service_date");--> statement-breakpoint
CREATE INDEX "transactions_category_id_idx" ON "transactions" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX "transactions_service_id_idx" ON "transactions" USING btree ("service_id");--> statement-breakpoint
CREATE INDEX "transactions_recorded_by_idx" ON "transactions" USING btree ("recorded_by");--> statement-breakpoint
CREATE INDEX "transactions_transaction_date_idx" ON "transactions" USING btree ("transaction_date");--> statement-breakpoint
CREATE INDEX "transactions_type_idx" ON "transactions" USING btree ("type");