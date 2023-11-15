import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

def create_charts(probability: list, save_path:str, classes=['congested_traffic', 'heavy_traffic', 'light_traffic', 'moderate_traffic', 'traffic_unrelated']):
    
    def create_radar_chart(df, classes_row, probability_row, save_path):
        categories = df[classes_row].tolist()
        N = len(categories)

        angles = [n / float(N) * 2 * np.pi for n in range(N)]
        angles += angles[:1]

        fig = plt.figure(figsize=(7,7))
        fig.set_facecolor("none")

        ax = fig.add_subplot(111, polar=True)

        ax.set_theta_offset(np.pi / 2)
        ax.set_theta_direction(-1)

        # Set the inside part (background) to be completely transparent
        ax.patch.set_facecolor('none')
        
        # Set the edge color (outer circle) to white
        ax.spines['polar'].set_color('gray')

        plt.xticks(angles[:-1], categories, size=10, color='white')

        # Add a gap between the labels and the chart
        ax.set_rlabel_position(0)
        
        plt.yticks([0.2, 0.4, 0.6, 0.8, 1.0], [])
        plt.ylim(0, 1)

        values = df[probability_row].values.flatten().tolist()
        values += values[:1]

        ax.plot(angles, values, 'o-', color='teal', linewidth=1, label="Data")
        ax.fill(angles, values, color='teal', alpha=0.7)
        
        # Save the chart as an image
        plt.savefig(f'{save_path}/radar_chart.png', bbox_inches='tight', transparent=True, dpi=300)
        plt.close()  # Close the figure to release resources


    def create_bar_chart(df, classes_row, probability_row, save_path):
        categories = df[classes_row].tolist()
        values = df[probability_row].values.flatten().tolist()
        
        fig, ax = plt.subplots(figsize=(7, 7))
        fig.patch.set_facecolor('none')  # Set the chart background to be completely transparent
        ax.patch.set_facecolor('none')

        bars = ax.barh(categories, values, color='teal', alpha=0.7)  # Use teal color for bars
        ax.spines['top'].set_visible(False)
        ax.spines['right'].set_visible(False)
        ax.spines['bottom'].set_color('gray')  # Set the bar chart border color to gray
        ax.spines['left'].set_color('gray')    # Set the bar chart border color to gray

        ax.tick_params(axis='x', colors='white')  # Set x-axis label color to white
        ax.tick_params(axis='y', colors='white')  # Set y-axis label color to white

        plt.xlabel('Confidence', color='white')  # Set x-axis label color to white
        plt.ylabel('Categories', color='white')  # Set y-axis label color to white

        plt.xticks([0.2, 0.4, 0.6, 0.8, 1.0])
        plt.xlim(0, 1)

        plt.grid(alpha=0.2)

        # Add value annotations on top of each bar
        # for bar, value in zip(bars, values):
        #     ax.text(value, bar.get_y() + bar.get_height()/2, f'{value:.2f}', ha='left', va='center', color='white')

        # Save the chart as an image
        plt.savefig(f'{save_path}/bar_chart.png', bbox_inches='tight', transparent=True, dpi=300)
        plt.close()  # Close the figure to release resources



    df = pd.DataFrame(
        dict(
            probability=probability,
            classes=classes
        )
    )

    create_radar_chart(
        df = df, 
        classes_row = 'classes', 
        probability_row = 'probability',
        save_path = save_path
    ) 

    create_bar_chart(
        df=df, 
        classes_row='classes', 
        probability_row='probability',
        save_path = save_path
    )

# # Example usage:
create_charts(
    probability = [0.4, 0.05, 0.05, 0.1, 0.4],
    save_path = './'
)
