import matplotlib.pyplot as plt

def make_prediction_confidence_chart_make(prediction: list, figure_output_path: str, labels = ['congested_traffic', 'traffic_unrelated', 'uncongested_traffic']):
    plt.style.use('dark_background')

    plt.figure(figsize=(10, 5))

    plt.bar(labels, prediction, color='Green')

    plt.yticks([i/10 for i in range(11)])

    plt.grid(axis='y', color='gray', alpha=0.5)

    # Add bar values on top of each bar
    for i, v in enumerate(prediction):
        plt.text(i, v, f'{v:.2f}', ha='center', va='bottom')

    plt.title('Class Predictions with Confidence Scores\n')
    plt.xlabel('Class Labels')
    plt.ylabel('Confidence Scores')

    # Saving the figure to a file
    plt.savefig(figure_output_path)

    # Closing the figure
    plt.close()
