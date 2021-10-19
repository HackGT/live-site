export enum InteractionType {
    Virtual = 'virtual',
    Inperson = 'inperson',
} 


//strings need to match cms, 
export enum EventType{
    Meal = "Meal",
    EmergingWorkshop = "Emerging Workshop",
    Ceremony = "Ceremony",
    SponsorTechTalk = "Sponsor Tech Talk",
    MiniEvents = "Mini-Events",
    Expo = "Expo",
    SponsorFair = "Sponsor Fair",
    Speaker = "Speaker",
    SponsorMiniChallenge = "Sponsor Mini-Challenge",
    Insight = "Insight",
    Discord = "Discord"
}

export enum IsCMSEvent{
    Meal = EventType.Meal,
    EmergingWorkshop = EventType.EmergingWorkshop,
    Ceremony = EventType.Ceremony,
    SponsorTechTalk = EventType.SponsorTechTalk,
    MiniEvents = EventType.MiniEvents,
    Expo = EventType.Expo,
    SponsorFair = EventType.SponsorFair,
    Speaker = EventType.Speaker,
    SponsorMiniChallenge = EventType.SponsorMiniChallenge
}

