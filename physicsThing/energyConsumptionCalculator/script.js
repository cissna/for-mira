$(document).ready(function() {
    const tableBody = $("table tbody")

    let sumEnergy = 0;
    let sumMoney = 0;

    function updateSums() {
        sumEnergy = 0;
        sumMoney = 0;

        $("table tbody tr").each(function() {
            const $row = $(this);
            const col5 = parseFloat($row.find("td:eq(5)").text()) || 0;
            const col6 = parseFloat($row.find("td:eq(6)").text()) || 0;

            sumEnergy += col5;
            sumMoney += col6;
        });
    }

    function updateRadioNames() {
        $("table tbody tr").each(function(index) {
            const row_num = index + 1;
            $(this).find('.radio-cell input[type="radio"]').attr('name', 'options' + row_num);
        });
    }

    $(".add-row-button").on("click", function() {
        const new_row_num = document.querySelectorAll('table tbody tr').length + 1;
        const newRow = '<tr>' +
                        `<td>${new_row_num}</td>` +
                        '<td contenteditable="true"></td>' +
                        '<td contenteditable="true" class="editableCell"></td>' +
                        '<td contenteditable="true" class="editableCell"></td>' +
                        `<td class="radio-cell">
                            <input type="radio" name="options' + new_row_num + '" value="Not Peak">No
                            <input type="radio" name="options' + new_row_num + '" value="Part Peak">Partly
                            <input type="radio" name="options' + new_row_num + '" value="Peak">Yes
                        </td>` +
                        '<td contenteditable="false" class="hoverable"></td>' +
                        '<td contenteditable="false" class="hoverable"></td>' +
                     '</tr>';
        tableBody.append(newRow);
        updateRadioNames();
    });


    tableBody.on('input', '.editableCell', function(e) {
        let inputValue = $(this).text();

        // Remove non-numeric characters using a regular expression
        let numericValue = inputValue.replace(/[^0-9]/g, '');

        // Check if the cleaned value is a valid number
        if (isNaN(numericValue)) {
            // If not a valid number, prevent default and return
            e.preventDefault();
            return;
        }
        // Get the current selection range
        let selection = window.getSelection();

        // Store the cursor position
        let cursorPosition = selection.anchorOffset;

        // Update the content of the cell with the cleaned value
        $(this).text(numericValue);

        // Set the cursor position back to its original position
        cursorPosition = Math.min(cursorPosition, numericValue.length);

        let range = document.createRange();
        if (isNaN(this.firstChild)) {
            range.setStart(this.firstChild, cursorPosition);
            range.setEnd(this.firstChild, cursorPosition);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    });

    $(".delete-row-button").on("click", function() {
        $("table tbody tr:last").remove();
        updateRadioNames();
    });

    $(".submit-button").on("click", function() {
        $("table tbody tr").each(function() {
            const $row = $(this);
            const col2 = parseFloat($row.find("td:eq(2)").text()) || 0;
            const col3 = parseFloat($row.find("td:eq(3)").text()) || 0;

            const sum = col2 + col3;
            const prod = col2 * col3;
            $row.find("td:eq(5)").text(Number(sum.toFixed(2)).toString());
            $row.find("td:eq(6)").text(Number(prod.toFixed(2)).toString());
        });
        // figure out sum of columns 5 and 6. Save them somewhere to use in the hovering thing
        updateSums()
        const resultElement = $(".result");
        resultElement.text('Total Monthly Cost: $' + Number(sumMoney.toFixed(2)).toString());
        resultElement.on("mouseenter", function() {
            resultElement.text(
                `Total Monthly Electricity Use: ${Number(sumEnergy.toFixed(2)).toString()} kWh`
            );
        }).on("mouseleave", function() {
            resultElement.text('Total Monthly Cost: $' + Number(sumMoney.toFixed(2)).toString());
        });
    });

    tableBody.on("mouseenter", "td.hoverable", function() {
        const initialContent = $(this).text();
        if (initialContent !== undefined && initialContent !== '') {
            const columnIndex = $(this).index();
            if (![5, 6].includes(columnIndex)) {
                console.error('incorrect cell flagged as hoverable or indexes changed')
            }
            updateSums()
            const appropriateSum = columnIndex === 6? sumMoney: sumEnergy

            // check if column sum is 0, if it is just say 0%
            if (appropriateSum === 0) {
                $(this).text("0%");
            } else {
                $(this).text(
                    Number((Number(100 * initialContent) / appropriateSum).toFixed(2))
                    + "%");
            }
            $(this).data("initialContent", initialContent);
        }
    }).on("mouseleave", "td.hoverable", function() {
        const initialContent = $(this).data("initialContent");
        if (initialContent !== undefined) {
            $(this).text(initialContent);
        }
    });
});
