var dataBase = { k: "k" }; // <username:password>
var input;
var arrowKey = { 37: "left", 38: "up", 39: "right", 40: "down" };
var controls = { left: 37, up: 38, right: 39, down: 40 };
var keyConfigListener;
var colorJson = {
  green: "green",
  yellow: "yellow",
  purple: "purple",
  blue: "blue",
};

function screenSwitch(divToShow) {
  resetView();
  $(divToShow).show();
  if (divToShow == "#game") {
    Start();
  }
}

function about() {
  console.log("ABOUT");
  $("#dialog").dialog("open");
}

function resetView() {
  $("#game").hide();
  $("#register").hide();
  $("#login").hide();
  $("#welcome").hide();
  $("#config").hide();
}
function initSelector() {
  for (var i = 40; i < 91; i++) {
    $("#food-config").append("<option value=" + i + ">" + i + "</option>");
  }

  for (var key in colorJson) {
    $(".color-input").append(
      "<option value=" + colorJson[key] + ">" + key + "</option>"
    );
  }
}

function keyConfig(keyToConfig) {
  $("#" + keyToConfig + "-config").text("Click on key");
  $("button").prop("disabled", true);
  console.log("Key " + keyToConfig);
  removeEventListener("keydown", keyConfig);
  let keyValue;
  var keyPress = false;
  keyConfigListener = addEventListener("keydown", function (e) {
    if (!keyPress) {
      keyValue = e.keyCode;
      const label = arrowKey[keyValue]
        ? arrowKey[keyValue]
        : String.fromCodePoint(keyValue);
      $("#" + keyToConfig + "-config").text(label);
      console.log("value = " + keyValue);
      controls[keyToConfig] = keyValue;
      $("button").prop("disabled", false);
    }
    keyPress = true;
  });
}
function setWelcome() {
  resetView();
  $("#welcome").show();
}

$(document).ready(function () {
  resetView();
  $("#welcome").show();
  initSelector();
  $("#login-button").click(function () {
    console.log("Login!");
    var name = $("#user-name").val();
    var password = $("#password").val();
    if (dataBase[name] == password) {
      screenSwitch("#game");
      return;
    }
    alert("User Name or Password is incorrect");
  });

  $("#register-button").click(function () {
    var alertMsg = "";
    var input = "";
    alertMsg += emptyInput();
    input = $("#password-reg").val();
    alertMsg += validatePassword(input);
    input = $("#full-name").val();
    alertMsg += validateName(input);
    input = $("#email").val();
    alertMsg += validateEmail(input);
    if (alertMsg != "") {
      alert(alertMsg);
      return;
    }
    dataBase[$("#user-name-reg").val()] = $("#password-reg").val();
    alert("User Created");
    resetView();
  });

  $("#start-btn").click(function () {
    var alertMsg = "";
    var input = "";
    //setConfigurations(-array of 4 buttons(start from up)
    // -amount of food 50-90 (int)
    // -balls 3 colors as string example["blue,red green"](array)
    // -time for game minimum 60 (int)
    // -monsters 1-4 (int)
    // );
    setConfigurations();
    $("#config").hide();
    $("#board").show();
  });

  $("#dialog").dialog({
    height: 300,
    width: 500,
    autoOpen: false,
    modal: true,
    open: function () {
      $(".ui-widget-overlay").bind("click", function () {
        $("#dialog").dialog("close");
      });
    },
  });

  $("select").change(function () {
    var otherSelects = $("select").not(this);
    var oldValue = $(this).data("old");
    if (oldValue)
      otherSelects
        .find("option[value=" + oldValue + "]")
        .removeAttr("disabled");
    if (this.value)
      otherSelects
        .find("option[value=" + this.value + "]")
        .attr("disabled", "disabled");
    $(this).data("old", this.value);
  });
});
