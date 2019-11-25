(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema

    myConnector.getSchema = function(schemaCallback) {
        var cols = [
          {id: "AffiliateManagerFullName", alias: "affiliate_manager", dataType: tableau.dataTypeEnum.string},
          {id: "StatOfferId", alias: "offer_id", dataType: tableau.dataTypeEnum.string},
          {id: "StatDate", alias: "date", dataType: tableau.dataTypeEnum.date},
          {id: "StatCityName", alias: "city_name", dataType: tableau.dataTypeEnum.string},
          {id: "StatHour", alias: "hour", dataType: tableau.dataTypeEnum.int},
          {id: "StatProfit", alias: "profit", dataType: tableau.dataTypeEnum.float},
          {id: "StatRevenue", alias: "revenue", dataType: tableau.dataTypeEnum.float},
          {id: "StatPayout", alias: "payout", dataType: tableau.dataTypeEnum.float},
          {id: "StatConversions", alias: "conversions", dataType: tableau.dataTypeEnum.int},
          {id: "StatClicks", alias: "clicks", dataType: tableau.dataTypeEnum.int},
          {id: "StatAffiliateId", alias: "affiliate_id", dataType: tableau.dataTypeEnum.string},
          {id: "StatAdvertiserId", alias: "advertiser_id", dataType: tableau.dataTypeEnum.string},
          {id: "OfferName", alias: "offer_name", dataType: tableau.dataTypeEnum.string},
          {id: "CountryName", alias: "country_name", dataType: tableau.dataTypeEnum.string},
          {id: "AffiliateCompany", alias: "affiliate_company", dataType: tableau.dataTypeEnum.string},
          {id: "AdvertiserManagerFullName", alias: "advertiser_manager", dataType: tableau.dataTypeEnum.string},
          {id: "AdvertiserCompany", alias: "advertiser_company", dataType: tableau.dataTypeEnum.string}];

        var tableInfo = {id: "HasoffersMeetsTableau", alias: "VisualizeHasoffersData", columns: cols};

        schemaCallback([tableInfo]);
    };

    // Download the data

    myConnector.getData = function(table, doneCallback) {

        $.getJSON("http://gamesvid.api.hasoffers.com/Apiv3/json?NetworkToken=SECRET_CODE&Target=Report&Method=getStats&\
        fields[]=AffiliateManager.full_name&fields[]=Stat.offer_id&fields[]=Stat.date&fields[]=Stat.city_name&\
        fields[]=Stat.hour&fields[]=Stat.profit&fields[]=Stat.revenue&\
        fields[]=Stat.payout&fields[]=Stat.conversions&fields[]=Stat.clicks&\
        fields[]=Stat.affiliate_id&fields[]=Stat.advertiser_id&fields[]=Offer.name&fields[]=Country.name&\
        fields[]=Affiliate.company&fields[]=AdvertiserManager.full_name&fields[]=Advertiser.company&\
        data_start=2019-10-21", function(resp){

        //$.getJSON("https://gamesvid.api.hasoffers.com/Apiv3/json?NetworkToken=NET9dZAghu6aDcFseiimVZkAujLKqt&Target=\
        //Report&Method=getStats&fields[]=Offer.name&fields[]=Advertiser.company", function(resp) {
          //var feat = resp.response.data.data,
          var feat = resp.data.data,
              tableData = [];

          // Iterate over the JSON object
          for (var i = 0, len = feat.length; i < len; i++) {
              tableData.push({
                  "AffiliateManagerFullName": feat[i].AffiliateManager.full_name,
                  "StatOfferId": feat[i].Stat.offer_id,
                  "StatDate": feat[i].Stat.date,
                  "StatCityName": feat[i].Stat.city_name,
                  "StatHour": feat[i].Stat.hour,
                  "StatProfit": feat[i].Stat.profit,
                  "StatRevenue": feat[i].Stat.revenue,
                  "StatPayout": feat[i].Stat.payout,
                  "StatConversions": feat[i].Stat.conversions,
                  "StatClicks": feat[i].Stat.clicks,
                  "StatAffiliateId": feat[i].Stat.affiliate_id,
                  "StatAdvertiserId": feat[i].Stat.advertiser_id,
                  "OfferName": feat[i].Offer.name,
                  "CountryName": feat[i].Country_name,
                  "AffiliateCompany": feat[i].Affiliate.company,
                  "AdvertiserManagerFullName": feat[i].AdvertiserManager.full_name,
                  "AdvertiserCompany": feat[i].Advertiser.company});

            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Hasoffers"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
