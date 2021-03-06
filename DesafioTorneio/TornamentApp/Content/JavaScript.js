﻿var $tournament = $('.tournament'),
    $bracket = $('<ul class="bracket"><li></li><li></li></ul>');

var participants = [];
var $brackets;
var quantity = 0;

function buildBracket($el, p1, p2) {
    if (!p1 && !p2) {
        $el.append($bracket.clone());
    }
}

buildBracket($tournament);

function chargerBrackets() {
    var level = 0,
        $previousBrackets;

    while (level < 4) {
        $brackets = $('.bracket');

        $brackets = $brackets.filter(function (i, el) {
            if ($previousBrackets) {
                if ($.inArray(el, $previousBrackets) >= 0) {
                    return false;
                }
            }
            return true;
        });

        if (!$previousBrackets) {
            $previousBrackets = $brackets;
        }
        else {
            $previousBrackets = $.merge($previousBrackets, $brackets);
        }

        $brackets.each(function () {
            $(this).find('li:empty').each(function () {
                buildBracket($(this));
            });
        });

        level++;
    }
}

chargerBrackets();

function cleanUp() {
    var $brackets = $('.bracket'),
        removed = false;
    for (var i = 0; i < $brackets.length; i++) {
        // break before there aren't enough spots
        if ($('li:empty').length === participants.length) break;

        var empty = true;
        $brackets.eq(i).find('li').each(function () {
            if (!$(this).is(':empty')) {
                empty = false;
            }
        });
        if (empty) {
            $brackets.eq(i).remove();
            removed = true;
        }
    }
    return removed;
}


function loadButtons() {
    // just do it over and over
    while (cleanUp()) { }

    var $empty = $('li:empty');
    for (var i = 0; i < participants.length; i++) {
        $empty.eq(i).html('<button>' + participants[i].NameTeam + '</button>');
    }
}

loadButtons();

function changeToButtons() {
    $('.bracket').each(function () {
        var $winner = $(this).children('.winner');
        if ($winner.length === 0) {
            var $winners = $(this).children('li').children('ul').children('.winner');
            if ($winners.length === 2) {
                $winners.each(function () {
                    $(this).html('<button class="winner">' + $(this).text() + '</button>');
                });
            }
        }
    });
}

function addTeams() {
    if (participants.length <= 32) {
        if ($('#idTeams').val() != "" || $('#idTeams').val() != undefined) {
            var objIndex = participants.findIndex((obj => obj.NameTeam == $('#idTeams').val())); debugger;
            if (objIndex < 0) {
                participants.push({ NameTeam: $('#idTeams').val(), Step: 1 });
                quantity = quantity + 1;
                $('#TeamsAdded').text('number of times added:' + quantity);
            } else {
                alert("Invalid name for Team!");
            }
        } else {
            alert("Name is required");
        }
    }
    else {
        alert("You have reached the limit of participants");
    }
}

function loadTournament() {
    $("ul").remove(".bracket");
    $tournament = $('.tournament'),
    $bracket = $('<ul class="bracket"><li></li><li></li></ul>');
    quantity = participants.length;
    buildBracket($tournament);
    chargerBrackets();
    loadButtons();
    var url = "/Tournament/SaveOrUpdateTournament";
    $.post(url, { tournament: obterTournament() },
        function (retorno) {
            alert("sucesso!");
        }
     );
}

function obterTournament() {
    var nameTournament = $("#idTournament").val()
    return {
        NameTournament: nameTournament,
        TimesList: participants
    }
}

$("#idClearTournament").click(function () {
    $("ul").remove(".bracket");
    $('#TeamsAdded').text("")
});

$(document).on('click', 'button', function () {
    var $ul;

    var objIndex = participants.findIndex((obj => obj.NameTeam == $(this).text()));
    participants[objIndex].Step = participants[objIndex].Step + 1;

    if (!$(this).hasClass('winner')) {
        $ul = $(this).parent().parent();
    }
    else {
        $ul = $(this).parent().parent().parent().parent();
    }
    $ul.append($('<li class="winner">' + $(this).text() + '</li>'));
    $ul.find('button').each(function () {
        $(this).replaceWith($(this).text());
    });

    changeToButtons();
});