# bar-app
Team DJ-TAVR

Endpoint Summaries:
get_sticker->gets all the stickers for the particular user
create_sticker->creates a sticker(pass in a drink object, bar, mlpp, sticker_id, and target)
delete_sticker->delete a sticker, pass in the request_id 
update_sticker->update a sticker with the new fields for a given request_id
shifts_stats->get the overpouring statistics for a shift start and end time
get_shifts->get the start and end time of all the shifts in a time range
revenue_results->view a rough esimate of revenue loss from overpouring
overpoured_drinks->get the five most overpoured drinks
