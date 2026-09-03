<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" indent="yes" encoding="UTF-8"/>

    <xsl:template match="/studentSkillProfile">
        <div style="background: rgba(18, 24, 38, 0.85); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; color: #f8fafc; font-family: 'Plus Jakarta Sans', sans-serif;">
            
            <!-- Transcript Header -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 14px; margin-bottom: 16px;">
                <div>
                    <h3 style="font-family: 'Outfit', sans-serif; font-size: 1.25rem; color: #818cf8; margin: 0;">Verified Competency Transcript</h3>
                    <p style="margin: 4px 0 0 0; font-size: 0.82rem; color: #94a3b8;">
                        Student: <strong style="color: #fff;"><xsl:value-of select="studentInfo/fullName"/></strong> | 
                        Reg: <strong style="color: #fff;"><xsl:value-of select="studentInfo/registerNo"/></strong> | 
                        Dept: <xsl:value-of select="studentInfo/department"/>
                    </p>
                </div>
                <div style="text-align: right;">
                    <span style="background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700;">
                        Readiness: <xsl:value-of select="studentInfo/readinessIndex"/>
                    </span>
                    <div style="font-size: 0.75rem; color: #94a3b8; margin-top: 4px;">Gap Index: <xsl:value-of select="studentInfo/overallGapIndex"/></div>
                </div>
            </div>

            <!-- Competency Table -->
            <h4 style="font-size: 0.95rem; color: #f472b6; margin-bottom: 10px;">Core Competency Domain Records</h4>
            <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; margin-bottom: 20px;">
                <thead>
                    <tr style="background: #1e1b4b; color: #fff;">
                        <th style="padding: 8px 10px; text-align: left;">Category</th>
                        <th style="padding: 8px 10px; text-align: left;">Skill Description</th>
                        <th style="padding: 8px 10px; text-align: center;">Current</th>
                        <th style="padding: 8px 10px; text-align: center;">Target</th>
                        <th style="padding: 8px 10px; text-align: left;">Status / Action</th>
                    </tr>
                </thead>
                <tbody>
                    <xsl:for-each select="competencyList/skill">
                        <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                            <td style="padding: 8px 10px; color: #94a3b8;"><xsl:value-of select="category"/></td>
                            <td style="padding: 8px 10px; font-weight: 600;"><xsl:value-of select="name"/></td>
                            <td style="padding: 8px 10px; text-align: center; color: #818cf8; font-weight: bold;"><xsl:value-of select="currentLevel"/>/5</td>
                            <td style="padding: 8px 10px; text-align: center; color: #94a3b8;"><xsl:value-of select="benchmarkLevel"/>/5</td>
                            <td style="padding: 8px 10px;">
                                <xsl:choose>
                                    <xsl:when test="currentLevel &gt;= benchmarkLevel">
                                        <span style="color: #34d399; font-weight: 600;">Benchmark Met</span>
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <span style="color: #fbbf24; font-weight: 600;">Gap: -<xsl:value-of select="benchmarkLevel - currentLevel"/></span>
                                    </xsl:otherwise>
                                </xsl:choose>
                            </td>
                        </tr>
                    </xsl:for-each>
                </tbody>
            </table>

            <!-- Verified Credentials -->
            <h4 style="font-size: 0.95rem; color: #38bdf8; margin-bottom: 10px;">Faculty Endorsed Credentials</h4>
            <div style="display: flex; flex-direction: column; gap: 8px;">
                <xsl:for-each select="verifiedCredentials/credential">
                    <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-left: 3px solid #10b981; padding: 10px 14px; border-radius: 4px;">
                        <div style="display: flex; justify-content: space-between; font-weight: 600;">
                            <span><xsl:value-of select="title"/></span>
                            <span style="color: #94a3b8; font-size: 0.78rem;">Verified: <xsl:value-of select="dateVerified"/></span>
                        </div>
                        <div style="font-size: 0.78rem; color: #94a3b8; margin-top: 2px;">
                            Issuing Body: <xsl:value-of select="issuingAuthority"/> | Auditor: <xsl:value-of select="verifiedBy"/>
                        </div>
                        <div style="font-size: 0.78rem; color: #a5b4fc; margin-top: 4px; font-style: italic;">
                            "<xsl:value-of select="mentorRemarks"/>"
                        </div>
                    </div>
                </xsl:for-each>
            </div>
        </div>
    </xsl:template>
</xsl:stylesheet>
