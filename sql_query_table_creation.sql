-- Users Table
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR UNIQUE NOT NULL,
    name VARCHAR NOT NULL,
    password_hashed VARCHAR NOT NULL,
    phone_number VARCHAR UNIQUE,
    role VARCHAR CHECK (role IN ('admin', 'user')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

-- Speciality Table
CREATE TABLE speciality (
    speciality_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    speciality_name VARCHAR UNIQUE NOT NULL
);

-- Disease Table
CREATE TABLE disease (
    disease_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    disease_name VARCHAR UNIQUE NOT NULL
);

-- Doctor Details Table
CREATE TABLE doctor_details (
    doctor_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    average_rating FLOAT DEFAULT 0 CHECK (average_rating BETWEEN 0 AND 5),
    experience_year INT CHECK (experience_year >= 0),
    degree VARCHAR NOT NULL,
    biography TEXT,
    photo_url VARCHAR,
    location VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

-- Doctor-Disease Lookup Table 
CREATE TABLE doctor_disease_lookup (
    doctor_id UUID REFERENCES doctor_details(doctor_id) ON DELETE CASCADE,
    disease_id UUID REFERENCES disease(disease_id) ON DELETE CASCADE,
    PRIMARY KEY (doctor_id, disease_id)
);

-- Doctor-Speciality Lookup Table 
CREATE TABLE doctor_speciality_lookup (
    doctor_id UUID REFERENCES doctor_details(doctor_id) ON DELETE CASCADE,
    speciality_id UUID REFERENCES speciality(speciality_id) ON DELETE CASCADE,
    PRIMARY KEY (doctor_id, speciality_id)
);

CREATE TABLE availability (
    availability_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doctor_id UUID REFERENCES doctor_details(doctor_id) ON DELETE CASCADE,
    date DATE NOT NULL,
    shift VARCHAR CHECK (shift IN ('morning', 'evening')) NOT NULL,
    slots JSONB NOT NULL, -- Store slots as JSON for flexibility
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE appointments (
    appointment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doctor_id UUID REFERENCES doctor_details(doctor_id) ON DELETE CASCADE,
    availability_id UUID REFERENCES availability(availability_id) ON DELETE CASCADE,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    patient_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    status VARCHAR CHECK (status IN ('pending', 'cancelled', 'confirmed', 'completed')) DEFAULT 'pending',
    booking_type VARCHAR CHECK (booking_type IN ('virtual', 'physical')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Reviews Table
CREATE TABLE reviews (
    review_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID REFERENCES appointments(appointment_id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES doctor_details(doctor_id) ON DELETE CASCADE,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications Table
CREATE TABLE notifications (
    notification_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES appointments(appointment_id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    type VARCHAR CHECK (type IN ('pending', 'confirmed')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
