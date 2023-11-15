# traffic-congestion-classifier

> #### Tasks Perfomed -> Data Collection (Manual, Web Scrapping)✅, EDA✅, Data Augmentation, Model Training (ML Algorithms, CNN, Transfer Learning)✅, Hyperparameter Tuning✅, Model Validation✅, Deployment (UI Design, React and FastAPI)✅

Upload images and make classification:

- `congested_traffic`: Indicates traffic congestion.
- `traffic_unrelated`: Indicates an absence of congestion-related traffic.
- `uncongested_traffic`: Indicates clear or uncongested traffic conditions.

For more details on the model training process, please visit the Kaggle project [here](https://www.kaggle.com/code/abhashrai/traffic-congestion-prediction-cnn-xception/).

# Demo

![App Demo](./documentation/demo.gif)

# Table of Content

- [Prerequisites](#prerequisites)
- [Usage](#usage)
- [Model Summary](#model-summary)
- [Model Evaluation](#model-evaluation)

# Prerequisites

- You must have `Python 3` installed on your system.
- You must have `Git` installed on your system.
- You must have `Git LFS` installed on your system (for cloning/downloading pre-trained model file).
- (Optional) You must have `Node.js` (npm) installed on your system (if using development server)

# Usage

1. Clone the repository (In terminal):

    ```
    git clone https://github.com/AbhashChamlingRai/traffic-congestion-detector.git
    ```

2. Install the required dependencies:

    ```
    pip install -r requirements.txt
    ```

3. Start Fast-API:

   Open `buld/fastapi` directory in your terminal. Then run:

    ```
    uvicorn main:app --port 8000 --reload
    ```

   Wait until you see below message in your terminal:

   ```
   Application startup complete.
   ```

4. Run App:

   Open `build/app/index.html` file in your browser. Upload images in the web app and make predictions.

<br>

5. (Optional) If you want to run development server:

   Open `development` directory in your terminal. Then run:
    
   ```
   npm install
   ```

   Wait until installation process completes, then run the server by running the command:

   ```
   npm start
   ```

# Model Summary

```Python
_________________________________________________________________
 Layer (type)                Output Shape              Param #   
=================================================================
 xception (Functional)       (None, 7, 7, 2048)        20861480  
                                                                 
 flatten_1 (Flatten)         (None, 100352)            0         
                                                                 
 batch_normalization_2 (Batc  (None, 100352)           401408    
 hNormalization)                                                 
                                                                 
 dense_2 (Dense)             (None, 256)               25690368  
                                                                 
 batch_normalization_3 (Batc  (None, 256)              1024      
 hNormalization)                                                 
                                                                 
 dropout_1 (Dropout)         (None, 256)               0         
                                                                 
 dense_3 (Dense)             (None, 3)                 771       
                                                                 
=================================================================
Total params: 46,955,051
Trainable params: 25,892,355
Non-trainable params: 21,062,696
_________________________________________________________________
```

# Model Evaluation

![Data split distribution chart](./documentation/splits.png)

The data has been partitioned into three sets for training, testing, and validation, each containing samples from three distinct classes. The split ratios are as follows: 70% for training, 15% for testing, and 15% for validation. Despite the limited data size, the model successfully met my expectations:

```Python
score, acc = model.evaluate(test_generator)
print('Test Loss =', score)
print('Test Accuracy =', acc)

2/2 [==============================] - 3s 2s/step - loss: 0.0628 - accuracy: 0.9920
Test Loss = 0.06284749507904053
Test Accuracy = 0.9920318722724915
```

```Python
def print_evaluation_metrics(model, generator, batch_size):
    X, y = [], []

    # Reset the generator
    generator.reset()

    # Loop through the generator to retrieve images and labels
    for i in range((generator.samples // batch_size)+1):
        batch_x, batch_y = generator.next()
        X.extend(batch_x)
        y.extend(batch_y)

    # Convert X and y to numpy arrays
    X = np.array(X)
    y = np.array(y)
    
    predictions = model.predict(X, verbose=1)
    y_pred = np.argmax(predictions, axis=1)
    
    y_true = np.argmax(y, axis=1)

    conf_matrix = confusion_matrix(y_true, y_pred)
    print("Confusion Matrix:")
    print(conf_matrix)
    print()

    class_report = classification_report(y_true, y_pred)
    print("Classification Report:")
    print(class_report)

    confusion_matrix(y_true, y_pred)
    
print_evaluation_metrics(model, test_generator, batch_size)

8/8 [==============================] - 2s 56ms/step

Confusion Matrix:
[[ 61   0   0]
 [  0 129   1]
 [  1   0  59]]

Classification Report:
              precision    recall  f1-score   support

           0       0.98      1.00      0.99        61
           1       1.00      0.99      1.00       130
           2       0.98      0.98      0.98        60

    accuracy                           0.99       251
   macro avg       0.99      0.99      0.99       251
weighted avg       0.99      0.99      0.99       251
```

![Training and validation loss and accuracy graph](./documentation/training_valid_loss_acc.png)
