$(document).ready(function(){
    var rating_option = 1;
    // alert(rating_option);
    $("#rating-menu li a").click(function(){
        rating_option = $(this).text();
        $("#rating-options").html(rating_option + '&nbsp;<span class="caret"></span>');
    });

    $("#find-api").on('click', function(){
        $("#api-names").empty();
        $("#api-details").empty();
        var updatedYearVal = $("#updatedYear").val();
        var protocolsVal = $("#protocols").val();
        var categoryVal = $("#category").val();
        var ratingVal = $("#rating").val();
        var tagsVal = $("#tags").val();
        $.ajax({
            type: "GET",
            url: "http://localhost:9091/findAPIs",
            dataType: 'json',
            data: {
                    "updatedYear": updatedYearVal,
                    "protocols": protocolsVal,
                    "category" : categoryVal,
                    "ratingOption" : rating_option,
                    "rating" : ratingVal,
                    "tags" : tagsVal
                },
                success : function(jsonResponse){
                    $("#api-names").empty();
                    $("#api-details").empty();
                    console.log(JSON.stringify(jsonResponse));
                    if(jsonResponse.length == 0){
                        alert("No data found");
                    }
                    else{
                        var apiNames = "";
                        $.each(jsonResponse, function(jsonIndex, value){
                            apiNames += '<a href="#" class="list-group-item">' + value.name + '</a>'
                        });
                        $("#api-names").append(apiNames);
                        $("#api-names a").on('click',function(){
                            $("#api-details").empty();
                            var index = $(this).index();
                            var id = jsonResponse[index].id;
                            var title = jsonResponse[index].title;
                            var summary = jsonResponse[index].summary;
                            var rating = jsonResponse[index].rating;
                            var label = jsonResponse[index].label;
                            var author = jsonResponse[index].author;
                            var description = jsonResponse[index].description;
                            var type = jsonResponse[index].type;
                            var downloads = jsonResponse[index].downloads;
                            var useCounts = jsonResponse[index].useCount;
                            var sampleUrl = jsonResponse[index].sampleUrl;
                            var downloadUrl = jsonResponse[index].downloadUrl;
                            var dateModified = jsonResponse[index].dateModified;
                            var remoteFeed = jsonResponse[index].remoteFeed;
                            var numComments = jsonResponse[index].numComments;
                            var commentsUrl = jsonResponse[index].commentsUrl;
                            var tags = jsonResponse[index].tags
                            var category = jsonResponse[index].category;
                            var protocols = jsonResponse[index].protocols;
                            var serviceEndpoint = jsonResponse[index].serviceEndpoint;
                            var version = jsonResponse[index].version;
                            var wsdl = jsonResponse[index].wsdl;
                            var dataFormats = jsonResponse[index].dataFormats;
                            var apiGroups = jsonResponse[index].apigroups;
                            var example = jsonResponse[index].example;
                            var clientInstall = jsonResponse[index].clientInstall;
                            var authentication = jsonResponse[index].authentication;
                            var ssl =jsonResponse[index].ssl;
                            var readOnly = jsonResponse[index].readonly;
                            var vendorApiKits = jsonResponse[index].vendorApiKits;
                            var communityApiKits = jsonResponse[index].communityApiKits;
                            var blog = jsonResponse[index].blog;
                            var forum = jsonResponse[index].forum;
                            var support = jsonResponse[index].support;
                            var accountReq = jsonResponse[index].accountReq;
                            var commercial = jsonResponse[index].commercial;
                            var provider = jsonResponse[index].provider;
                            var managedBy = jsonResponse[index].managedBy;
                            var nonCommercial = jsonResponse[index].nonCommercial;
                            var dataLicensing = jsonResponse[index].dataLicensing;
                            var fees = jsonResponse[index].fees;
                            var limits = jsonResponse[index].limits;
                            var terms = jsonResponse[index].terms;
                            var company = jsonResponse[index].company;
                            var updated = jsonResponse[index].updated;
                            $("#api-details").append("<b>ID: </b>" + id + "<br/>");
                            $("#api-details").append("<b>Title: </b>" + title + "<br/>");
                            $("#api-details").append("<b>Summary: </b>" + summary + "<br/>");
                            $("#api-details").append("<b>Rating: </b>" + rating + "<br/>");
                            $("#api-details").append("<b>Label: </b>" + label + "<br/>");
                            if(author == ""){
                                $("#api-details").append("<b>Author: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#api-details").append("<b>Author: </b>" + author + "<br/>");
                            }
                            $("#api-details").append("<b>Description: </b>" + description + "<br/>");
                            $("#api-details").append("<b>Type: </b>" + type + "<br/>");
                            if(downloads == ""){
                                $("#api-details").append("<b>Downloads: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#api-details").append("<b>Downloads: </b>" + downloads + "<br/>");
                            }
                            if(useCounts == ""){
                                $("#api-details").append("<b>Use count: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#api-details").append("<b>Use count: </b>" + useCounts + "<br/>");
                            }
                            
                            $("#api-details").append("<b>Sample URL: </b>" + sampleUrl + "<br/>");
                            if(downloadUrl == ""){
                                $("#api-details").append("<b>Download URL: </b>" + "--" + "<br/>");
                            }
                            else{
                                $("#api-details").append("<b>Download URL: </b>" + downloadUrl + "<br/>");
                            }
                            $("#api-details").append("<b>Date Modified: </b>" + dateModified.replace("T", " ").replace("Z", "") + "<br/>");
                            if(remoteFeed == ""){
                                $("#api-details").append("<b>Remote Feed: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#api-details").append("<b>Remote Feed: </b>" + remoteFeed + "<br/>");
                            }
                            if(numComments == ""){
                                $("#api-details").append("<b>Number of Comments: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#api-details").append("<b>Number of Comments: </b>" + numComments + "<br/>");
                            }
                            if(commentsUrl == ""){
                                $("#api-details").append("<b>Comments URL: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#api-details").append("<b>Comments URL: </b>" + commentsUrl + "<br/>");
                            }
                            $("#api-details").append("<b>Tags: </b>" + tags + "<br/>");
                            $("#api-details").append("<b>Category: </b>" + category + "<br/>");
                            $("#api-details").append("<b>Protocol: </b>" + protocols + "<br/>");
                            if(serviceEndpoint == ""){
                                $("#api-details").append("<b>Service Endpoints: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#api-details").append("<b>Service Endpoints: </b>" + serviceEndpoint + "<br/>");
                            }
                            if(version == ""){
                                $("#api-details").append("<b>Version: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#api-details").append("<b>Version: </b>" + version + "<br/>");
                            }
                            if(wsdl == ""){
                                $("#api-details").append("<b>WSDL: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#api-details").append("<b>WSDL: </b>" + wsdl + "<br/>");
                            }
                            $("#api-details").append("<b>Data Formats: </b>" + dataFormats + "<br/>");
                            if(apiGroups == ""){
                                $("#api-details").append("<b>API Groups: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#api-details").append("<b>API Groups: </b>" + apiGroups + "<br/>");
                            }
                            if(example == ""){
                                $("#api-details").append("<b>Example: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#api-details").append("<b>Example: </b>" + example + "<br/>");
                            }
                            if(clientInstall == ""){
                                $("#api-details").append("<b>Client Install: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#api-details").append("<b>Client Install: </b>" + clientInstall + "<br/>");
                            }
                            if(authentication == ""){
                                $("#api-details").append("<b>Authentication: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#api-details").append("<b>Authentication: </b>" + authentication + "<br/>");
                            }
                            if(ssl == ""){
                                $("#api-details").append("<b>SSL: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#api-details").append("<b>SSL: </b>" + ssl + "<br/>");
                            }
                            if(readOnly == ""){
                                $("#api-details").append("<b>Read Only: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#api-details").append("<b>Read Only: </b>" + readOnly + "<br/>");
                            }
                            if(vendorApiKits == ""){
                                $("#api-details").append("<b>Vendor API Kits: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#api-details").append("<b>Vendor API Kits: </b>" + vendorApiKits + "<br/>");
                            }
                            if(communityApiKits == ""){
                                $("#api-details").append("<b>Community API Kits: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#api-details").append("<b>Community API Kits: </b>" + communityApiKits + "<br/>");
                            }
                            if(blog == ""){
                                $("#api-details").append("<b>Blog: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#api-details").append("<b>Blog: </b>" + blog + "<br/>");
                            }
                            if(forum == ""){
                                $("#api-details").append("<b>Forum: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#api-details").append("<b>Forum: </b>" + forum + "<br/>");
                            }
                            if(support == ""){
                                $("#api-details").append("<b>Support: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#api-details").append("<b>Support: </b>" + support + "<br/>");
                            }
                            if(accountReq == ""){
                                $("#api-details").append("<b>Account Required: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#api-details").append("<b>Account Required: </b>" + accountReq + "<br/>");
                            }
                            if(commercial == ""){
                                $("#api-details").append("<b>Commercial: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#api-details").append("<b>Commercial: </b>" + commercial + "<br/>");
                            }
                            $("#api-details").append("<b>Provider: </b>" + provider + "<br/>");
                            if(managedBy == ""){
                                $("#api-details").append("<b>Managed By: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#api-details").append("<b>Managed By: </b>" + managedBy + "<br/>");
                            }
                            if(nonCommercial == ""){
                                $("#api-details").append("<b>Non Commercial: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#api-details").append("<b>Non Commercial: </b>" + nonCommercial + "<br/>");
                            }
                            if(dataLicensing == ""){
                                $("#api-details").append("<b>Data Licensing: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#api-details").append("<b>Data Licensing: </b>" + dataLicensing + "<br/>");
                            }
                            if(fees == ""){
                                $("#api-details").append("<b>Fees: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#api-details").append("<b>Fees: </b>" + fees + "<br/>");
                            }
                            if(limits == ""){
                                $("#api-details").append("<b>Limits: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#api-details").append("<b>Limits: </b>" + limits + "<br/>");
                            }
                            if(terms == ""){
                                $("#api-details").append("<b>Terms: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#api-details").append("<b>Terms: </b>" + terms + "<br/>");
                            }
                            if(company == ""){
                                $("#api-details").append("<b>Company: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#api-details").append("<b>Company: </b>" + company + "<br/>");
                            }
                            $("#api-details").append("<b>Updated: </b>" + updated.replace("T", " ").replace("Z", "") + "<br/>");
                        });
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert("Error");
                }
        });
    });

    $("#find-mashup").on('click', function(){
        $("#mashup-names").empty();
        $("#mashup-details").empty();
        var updatedYearVal = $("#updatedYearMashup").val();
        var tagsVal = $("#tagsMashup").val();
        var usedAPIVal = $("#used-apis").val();
        $.ajax({
                type : "GET",
                url : "http://localhost:9091/findMashups",
                dataType : "json",
                data: {
                    updatedYear: updatedYearVal,
                    usedAPIs: usedAPIVal,
                    tags : tagsVal
                },
                success : function(jsonResponse){
                    $("#mashup-names").empty()
                    $("#mashup-details").empty();
                    if(jsonResponse.length == 0){
                        alert("No data found");
                    }
                    else{
                        var mashupNames = "";
                        $.each(jsonResponse, function(jsonIndex, value){
                            mashupNames += '<a href="#" class="list-group-item">' + value.name + '</a>'
                        });
                        $("#mashup-names").append(mashupNames);
                        $("#mashup-names a").on('click',function(){
                            $("#mashup-details").empty();
                            var index = $(this).index();
                            var id = jsonResponse[index].id;
                            var title = jsonResponse[index].title;
                            var summary = jsonResponse[index].summary;
                            var rating = jsonResponse[index].rating;
                            var label = jsonResponse[index].label;
                            var author = jsonResponse[index].author;
                            var description = jsonResponse[index].description;
                            var type = jsonResponse[index].type;
                            var downloads = jsonResponse[index].downloads;
                            var useCounts = jsonResponse[index].useCount;
                            var sampleUrl = jsonResponse[index].sampleUrl;
                            var dateModified = jsonResponse[index].dateModified;
                            var numComments = jsonResponse[index].numComments;
                            var commentsUrl = jsonResponse[index].commentsUrl;
                            var tags = jsonResponse[index].tags
                            var apis = jsonResponse[index].apis;
                            var updated = jsonResponse[index].updated;
                            $("#mashup-details").append("<b>ID: </b>" + id + "<br/>");
                            $("#mashup-details").append("<b>Title: </b>" + title + "<br/>");
                            $("#mashup-details").append("<b>Summary: </b>" + summary + "<br/>");
                            $("#mashup-details").append("<b>Rating: </b>" + rating + "<br/>");
                            $("#mashup-details").append("<b>Label: </b>" + label + "<br/>");
                            if(author == ""){
                                $("#mashup-details").append("<b>Author: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#mashup-details").append("<b>Author: </b>" + author + "<br/>");
                            }
                            $("#mashup-details").append("<b>Description: </b>" + description + "<br/>");
                            $("#mashup-details").append("<b>Type: </b>" + type + "<br/>");
                            if(downloads == ""){
                                $("#mashup-details").append("<b>Downloads: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#mashup-details").append("<b>Downloads: </b>" + downloads + "<br/>");
                            }
                            if(useCounts == ""){
                                $("#mashup-details").append("<b>Use count: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#mashup-details").append("<b>Use count: </b>" + useCounts + "<br/>");
                            }
                            
                            $("#mashup-details").append("<b>Sample URL: </b>" + sampleUrl + "<br/>");
                            $("#mashup-details").append("<b>Date Modified: </b>" + dateModified.replace("T", " ").replace("Z", "") + "<br/>");
                            if(numComments == ""){
                                $("#mashup-details").append("<b>Number of Comments: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#mashup-details").append("<b>Number of Comments: </b>" + numComments + "<br/>");
                            }
                            if(commentsUrl == ""){
                                $("#mashup-details").append("<b>Comments URL: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#mashup-details").append("<b>Comments URL: </b>" + commentsUrl + "<br/>");
                            }
                            $("#mashup-details").append("<b>Tags: </b>" + tags + "<br/>");
                            var apiDetails = "<p>"
                            $.each(apis, function(index, val){
                                apiDetails += "<font color = 'red'> Name: </font>"  + val.name + "<font color = 'red'> URL: </font>" + val.url + "<br/>";
                            });
                            apiDetails += "</p>";
                            $("#mashup-details").append("<b>APIs used: </b>" + apiDetails);
                            $("#mashup-details").append("<b>Updated: </b>" + updated.replace("T", " ").replace("Z", "") + "<br/>");
                        });
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert("Error");
                }
            });
    });


    $("#find-keywords").on('click', function(){
        $("#keywords-names").empty();
        $("#keywords-details").empty();
        var keywordsVal = $("#keywords").val();
        $.ajax({
                type : "GET",
                url : "http://localhost:9091/findKeywords",
                dataType : "json",
                data: {
                    keyword: keywordsVal,
                },
                success : function(jsonResponse){
                    $("#keywords-names").empty();
                    $("#keywords-details").empty();
                    if(jsonResponse.length == 0){
                        alert("No data found");
                    }
                    else{
                        // alert(JSON.stringify(jsonResponse));
                        // console.log(JSON.stringify(jsonResponse));
                        var name = "";
                        $.each(jsonResponse, function(jsonIndex, value){
                            name += '<a href="#" class="list-group-item">' + value.name + '</a>'
                        });
                        $("#keywords-names").append(name);
                        $("#keywords-names a").on('click',function(){
                            $("#keywords-details").empty();
                            var index = $(this).index();
                            console.log(JSON.stringify(jsonResponse[index]));
                            var id = jsonResponse[index].id;
                            var title = jsonResponse[index].title;
                            var summary = jsonResponse[index].summary;
                            var rating = jsonResponse[index].rating;
                            var label = jsonResponse[index].label;
                            var author = jsonResponse[index].author;
                            var description = jsonResponse[index].description;
                            var type = jsonResponse[index].type;
                            var downloads = jsonResponse[index].downloads;
                            var useCounts = jsonResponse[index].useCount;
                            var sampleUrl = jsonResponse[index].sampleUrl;
                            var dateModified = jsonResponse[index].dateModified;
                            var numComments = jsonResponse[index].numComments;
                            var commentsUrl = jsonResponse[index].commentsUrl;
                            var tags = jsonResponse[index].tags
                            // var apis = jsonResponse[index].apis;
                            var updated = jsonResponse[index].updated;
                            $("#keywords-details").append("<b>ID: </b>" + id + "<br/>");
                            $("#keywords-details").append("<b>Title: </b>" + title + "<br/>");
                            $("#keywords-details").append("<b>Summary: </b>" + summary + "<br/>");
                            $("#keywords-details").append("<b>Rating: </b>" + rating + "<br/>");
                            $("#keywords-details").append("<b>Label: </b>" + label + "<br/>");
                            if(author == ""){
                                $("#keywords-details").append("<b>Author: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#keywords-details").append("<b>Author: </b>" + author + "<br/>");
                            }
                            $("#keywords-details").append("<b>Description: </b>" + description + "<br/>");
                            $("#keywords-details").append("<b>Type: </b>" + type + "<br/>");
                            if(downloads == ""){
                                $("#keywords-details").append("<b>Downloads: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#keywords-details").append("<b>Downloads: </b>" + downloads + "<br/>");
                            }
                            if(useCounts == ""){
                                $("#keywords-details").append("<b>Use count: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#keywords-details").append("<b>Use count: </b>" + useCounts + "<br/>");
                            }
                            
                            $("#keywords-details").append("<b>Sample URL: </b>" + sampleUrl + "<br/>");
                            $("#keywords-details").append("<b>Date Modified: </b>" + dateModified.replace("T", " ").replace("Z", "") + "<br/>");
                            if(numComments == ""){
                                $("#keywords-details").append("<b>Number of Comments: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#keywords-details").append("<b>Number of Comments: </b>" + numComments + "<br/>");
                            }
                            if(commentsUrl == ""){
                                $("#keywords-details").append("<b>Comments URL: </b>" + "---" + "<br/>");
                            }
                            else{
                                $("#keywords-details").append("<b>Comments URL: </b>" + commentsUrl + "<br/>");
                            }
                            $("#keywords-details").append("<b>Tags: </b>" + tags + "<br/>");
                            if(jsonResponse[index].hasOwnProperty('apis')){
                                var apiDetails = "<p>"
                                $.each(jsonResponse[index].apis, function(currIndex, val){
                                    apiDetails += "<font color = 'red'> Name: </font>"  + val.name + "<font color = 'red'> URL: </font>" + val.url + "<br/>";
                                });
                                apiDetails += "</p>";
                                $("#keywords-details").append("<b>APIs used: </b>" + apiDetails);
                            }
                            else{
                                var serviceEndpoint = jsonResponse[index].serviceEndpoint;
                                var dataFormats = jsonResponse[index].dataFormats;
                                var provider = jsonResponse[index].provider;
                                var managedBy = jsonResponse[index].managedBy;
                                if(serviceEndpoint == ""){
                                    $("#keywords-details").append("<b>Service Endpoints: </b>" + "---" + "<br/>");
                                }
                                else{
                                    $("#keywords-details").append("<b>Service Endpoints: </b>" + serviceEndpoint + "<br/>");
                                }
                                $("#keywords-details").append("<b>Data Formats: </b>" + dataFormats + "<br/>");
                                $("#keywords-details").append("<b>Provider: </b>" + provider + "<br/>");
                                if(managedBy == ""){
                                    $("#keywords-details").append("<b>Managed By: </b>" + "---" + "<br/>");
                                }
                                else{
                                    $("#keywords-details").append("<b>Managed By: </b>" + managedBy + "<br/>");
                                }
                            }
                            $("#keywords-details").append("<b>Updated: </b>" + updated.replace("T", " ").replace("Z", "") + "<br/>");
                        });
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert("Error");
                }
            });
    });


});