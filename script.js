var app = {
    downloads: [],

    api: function(endpoint) {
        endpoint = endpoint || '';
        endpoint = endpoint.replace('https://api.iconfinder.com/v4/', '');
        console.log('https://iconfinder-api-auth.herokuapp.com/v4/' + endpoint);

        return 'https://iconfinder-api-auth.herokuapp.com/v4/' + endpoint;
    },

    indicateLoading: function(state) {
        $('#search button i').toggleClass('fa-circle-o-notch fa-spin', state);
        $('#search input[type="text"]').attr('disabled', state);
    },

    search: function(e) {
        e.preventDefault();

        if ($('#search #query').val().length > 0) {
            var query = $('#search').serialize();

            app.indicateLoading(true);

            $.getJSON(app.api('icons/search?' + query), function(result) {
                app.renderResults(result);
                app.indicateLoading(false);
            });
        }

        $('.results').hide().empty();
    },


    

    renderResults: function(data) {
        var html = '';
        var template = $('#result-template').html();
        var compile = _.template(template);

        if (data.total_count > 0) {
            $.each(data.icons, function(index, icon) {
                var file = _.last(icon.raster_sizes);
                html += compile({
                    url: file.formats[0].preview_url,
                    icon_id: icon.icon_id
                });
            });
            $('.results').html(html).fadeIn();
        }
    },
};

_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g,
    escape: /\{\{-(.*?)\}\}/g
};

$(function() {
    $('#search').on('submit', app.search);
});
