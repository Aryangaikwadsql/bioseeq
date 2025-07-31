import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Load dataset
data = pd.read_csv('../breast-cancer (1).csv')

# Map diagnosis to binary values
data['diagnosis'] = data['diagnosis'].map({'B': 0, 'M': 1})

# Prepare features and labels
X = data.drop(['diagnosis', 'id', 'Unnamed: 32'], axis=1, errors='ignore')
y = data['diagnosis']

# Split data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale features
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Build model
model = Sequential([
    Dense(31, activation='relu', input_shape=(X_train.shape[1],)),
    Dense(25, activation='relu'),
    Dense(20, activation='relu'),
    Dense(1, activation='sigmoid')
])

model.compile(
    loss='binary_crossentropy',
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.01),
    metrics=['accuracy']
)

# Train model
model.fit(X_train, y_train, epochs=200, batch_size=32, verbose=2)

# Evaluate model
loss, accuracy = model.evaluate(X_test, y_test, verbose=0)
print(f'Test Accuracy: {accuracy * 100:.2f}%')

# Save model and scaler
model.save('breast_cancer_model.h5')
import joblib
joblib.dump(scaler, 'scaler.save')
