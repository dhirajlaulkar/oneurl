import { db } from "../db";

export const analyticsService = {
  async getLinkStats(linkId: string, startDate?: Date, endDate?: Date) {
    return {
      linkId,
      totalClicks: 0,
      clicksOverTime: [],
      clicksByCountry: [],
      clicksByDevice: [],
    };
  },

  async getProfileStats(profileId: string, startDate?: Date, endDate?: Date) {
    return {
      profileId,
      totalClicks: 0,
      topLinks: [],
      clicksOverTime: [],
    };
  },
};

