use wasm_bingen::prelude::*
use chrono::{Utc, FixedOffset, Duration};

#[wasm_bindgen]
pub fn calculate_time_left() -> String {
    let target_date = Utc
        .with_ymd_and_hms(2024, 12, 13, 23, 30, 0)
        .unwrap()
        .with_timezone(&FixedOffset::east(12 * 3600)); // NZST is UTC+12
    
    let now = Utc::now();
    if now > target_date {
        return "Gayathri's Home!".to_string();
    }

    let remaining = target_date - now;
    let days = remaining.num_days();
    let hours = (remaining - Duration::days(days)).num_hours();
    let minutes = (remaining - Duration::hours(hours)).num_minutes();
    let seconds = (remaining - Duration::minutes(minutes)).num_seconds();

    format!("{} days {} hours {} minutes {} seconds till Gayahtri comes home !", days, hours, minutes, seconds);

}
