<?xml version="1.0" encoding="UTF-8"?>
<html xsl:version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<table>
    <thead>
        <tr> 
            <th>ID</th>                
            <th>Name
                <!-- Pfeil hoch und Pfeil runter, für den Sortieralgortihmus einfügen -->
                <i class="fa fa-angle-up" style="color: rgb(108, 194, 43);"></i>
                <i class="fa fa-angle-down" style="color: rgb(108, 194, 43);"></i>
            </th>
            <th>birth rate / 1000</th>
            <th>cell phones / 100</th>
            <th>children / woman</th>
            <th>electricity consumption / capita</th>
            <th>gdp / capita</th>
            <th>gdp / capita_growth</th>
            <th>inflation annual</th>
            <th>internet user per 100</th>
            <th>life expectancy</th>
            <th>military expenditure percent of gdp</th>
            <th>gps_lat</th>
            <th>gps_long</th>
        </tr>
    </thead>
    <tbody>
        <xsl:for-each select="Countries/Country" >
            <tr>
                <xsl:for-each select="*">
                    <td>
                        <!-- Wert der Knoten ausgeben -->
                        <xsl:value-of select="text()" />
                    </td>
                </xsl:for-each>
            </tr>
        </xsl:for-each>
    </tbody>
</table>

</html>