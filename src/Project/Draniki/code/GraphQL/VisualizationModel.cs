namespace Draniki.Project.Draniki.GraphQL
{
    using System;
    using System.Collections;
    using System.Collections.Concurrent;
    using System.Collections.Generic;
    using System.Reactive.Linq;
    using System.Reactive.Subjects;

    public class VisualizationModel
    {
        // ToDo: to refactor
        private static readonly VisualizationModel storage = new VisualizationModel();

        public static VisualizationModel GetCurrent()
        {
            return storage;
        }

        private readonly ISubject<string> themeStream = new ReplaySubject<string>(1);

        private readonly ISubject<string> subscriptionEmailStream = new ReplaySubject<string>(1);

        private readonly ISubject<VisualizationModel> visualizationStream = new ReplaySubject<VisualizationModel>(1);

        private string theme = "light";

        private string subscriptionEmail = null;

        public string Theme
        {
            get => this.theme;
            set
            {
                this.theme = value;
                this.visualizationStream.OnNext(this);
                this.themeStream.OnNext(value);
            }
        }

        public string SubscriptionEmail
        {
            get => this.subscriptionEmail;
            set
            {
                this.subscriptionEmail = value;
                this.visualizationStream.OnNext(this);
                this.themeStream.OnNext(value);
            }
        }

        public IObservable<string> ThemeObservable => this.themeStream.AsObservable();

        public IObservable<string> SubscriptionEmailObservable => this.subscriptionEmailStream.AsObservable();

        public IObservable<VisualizationModel> ModelObservable
        {
            get
            {
                this.Theme = this.Theme;
                return this.visualizationStream.AsObservable();
            }
        }
    }
}